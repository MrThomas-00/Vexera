#!/usr/bin/env python3
"""Import the phpMyAdmin MySQL dump (Backend/voxeratb.sql) into a local SQLite
database and export the ranks API payload as a static JSON file
(public/ranks.json) so the site works on static hosting (GitHub Pages).

Usage:
    python3 scripts/import_db.py
"""

import json
import re
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SQL_FILE = ROOT / "Backend" / "voxeratb.sql"
SQLITE_FILE = ROOT / "Backend" / "voxeratb.sqlite"
JSON_FILE = ROOT / "public" / "ranks.json"
BASE_URL = "/Vexera/"  # keep in sync with vite.config.js `base`


def split_tuples(values_str: str):
    """Split a MySQL VALUES list into tuples, respecting quoted strings."""
    tuples = []
    current = []
    in_str = False
    i = 0
    buf = ""
    depth = 0
    while i < len(values_str):
        ch = values_str[i]
        if in_str:
            buf += ch
            if ch == "'":
                # handle escaped '' inside string
                if i + 1 < len(values_str) and values_str[i + 1] == "'":
                    buf += values_str[i + 1]
                    i += 1
                else:
                    in_str = False
            i += 1
            continue
        if ch == "'":
            in_str = True
            buf += ch
        elif ch == "(":
            depth += 1
            if depth == 1:
                buf = ""
            else:
                buf += ch
        elif ch == ")":
            depth -= 1
            if depth == 0:
                current.append(buf)
                tuples.append(tuple(current))
                current = []
                buf = ""
            else:
                buf += ch
        elif ch == "," and depth == 1:
            current.append(buf)
            buf = ""
        else:
            buf += ch
        i += 1
    return tuples


def parse_value(tok: str):
    tok = tok.strip()
    if tok.upper() == "NULL":
        return None
    if tok.startswith("'") and tok.endswith("'"):
        return tok[1:-1].replace("''", "'").replace("\\'", "'")
    try:
        return int(tok)
    except ValueError:
        try:
            return float(tok)
        except ValueError:
            return tok


def parse_inserts(sql: str, table: str):
    """Extract column names and rows from INSERT INTO `table` statements."""
    pattern = re.compile(
        r"INSERT INTO `%s`\s*\(([^)]*)\)\s*VALUES\s*(.*?);" % re.escape(table),
        re.DOTALL,
    )
    rows = []
    for match in pattern.finditer(sql):
        cols = [c.strip().strip("`") for c in match.group(1).split(",")]
        for tup in split_tuples(match.group(2)):
            values = [parse_value(t) for t in tup]
            rows.append(dict(zip(cols, values)))
    return rows


def main():
    sql = SQL_FILE.read_text(encoding="utf-8")

    ranks = parse_inserts(sql, "ranks")
    tags = parse_inserts(sql, "rank_tags")
    print(f"Parsed {len(ranks)} ranks and {len(tags)} tags from {SQL_FILE.name}")

    if SQLITE_FILE.exists():
        SQLITE_FILE.unlink()
    conn = sqlite3.connect(SQLITE_FILE)
    cur = conn.cursor()
    cur.execute(
        """CREATE TABLE ranks (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            price INTEGER NOT NULL,
            image TEXT,
            description TEXT,
            is_popular INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1,
            sort_order INTEGER DEFAULT 0
        )"""
    )
    cur.execute(
        """CREATE TABLE rank_tags (
            id INTEGER PRIMARY KEY,
            rank_id INTEGER NOT NULL REFERENCES ranks(id) ON DELETE CASCADE,
            tag TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0
        )"""
    )
    for r in ranks:
        cur.execute(
            "INSERT INTO ranks (id,name,slug,price,image,description,is_popular,is_active,sort_order)"
            " VALUES (?,?,?,?,?,?,?,?,?)",
            (
                r["id"], r["name"], r["slug"], r["price"], r["image"],
                r["description"], r["is_popular"], r["is_active"], r["sort_order"],
            ),
        )
    for t in tags:
        cur.execute(
            "INSERT INTO rank_tags (id,rank_id,tag,sort_order) VALUES (?,?,?,?)",
            (t["id"], t["rank_id"], t["tag"], t["sort_order"]),
        )
    conn.commit()

    # Export the same JSON shape ranks.php would return
    cur.execute(
        """SELECT id, name, slug, price, image, description, is_popular
           FROM ranks WHERE is_active = 1 ORDER BY sort_order ASC"""
    )
    payload = []
    for rid, name, slug, price, image, description, is_popular in cur.fetchall():
        cur.execute(
            "SELECT tag FROM rank_tags WHERE rank_id = ? ORDER BY sort_order ASC",
            (rid,),
        )
        tag_list = [row[0] for row in cur.fetchall()]
        img = (BASE_URL + image.lstrip("/")) if image else None
        payload.append(
            {
                "id": int(rid),
                "name": name,
                "slug": slug,
                "price": int(price),
                "image": img,
                "description": description,
                "is_popular": bool(is_popular),
                "tags": tag_list,
            }
        )
    conn.close()

    JSON_FILE.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Wrote {SQLITE_FILE.relative_to(ROOT)} and {JSON_FILE.relative_to(ROOT)}")
    print(json.dumps(payload, ensure_ascii=False, indent=2)[:400] + " ...")


if __name__ == "__main__":
    main()

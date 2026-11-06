// Ranks are served as a static JSON file (generated from the database dump
// by scripts/import_db.py) so the site works on static hosting like GitHub Pages.
const RANKS_URL = `${import.meta.env.BASE_URL}ranks.json`

export async function getRanks() {
  const response = await fetch(RANKS_URL)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json()
}

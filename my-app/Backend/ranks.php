<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/config.php';

try {

    $stmt = $pdo->query("
        SELECT
            id,
            name,
            slug,
            price,
            image,
            description,
            is_popular
        FROM ranks
        WHERE is_active = 1
        ORDER BY sort_order ASC
    ");

    $ranks = $stmt->fetchAll();

    foreach ($ranks as &$rank) {

        $tagStmt = $pdo->prepare("
            SELECT tag
            FROM rank_tags
            WHERE rank_id = ?
            ORDER BY sort_order ASC
        ");

        $tagStmt->execute([$rank['id']]);

        $rank['tags'] = $tagStmt->fetchAll(PDO::FETCH_COLUMN);

        $rank['id'] = (int) $rank['id'];
        $rank['price'] = (int) $rank['price'];
        $rank['is_popular'] = (bool) $rank['is_popular'];
    }

    echo json_encode(
        $ranks,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'error' => 'Failed to fetch ranks'
    ], JSON_UNESCAPED_UNICODE);
}
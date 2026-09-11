#!/usr/bin/env python3
"""
Gera SQL para restaurar timestamps originais dos posts importados.

Depois de rodar import_to_flarum.py, execute:
  python3 fix_timestamps.py --log ../output/import-log.json --output ../output/fix-timestamps.sql

Depois, no servidor do Flarum (via phpMyAdmin, Adminer, ou CLI MySQL):
  mysql -u USER -p DATABASE < fix-timestamps.sql
"""

import argparse
import json
from pathlib import Path
from datetime import datetime, timezone


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--log", required=True, help="Caminho para import-log.json")
    p.add_argument("--output", required=True, help="Caminho para .sql de saída")
    return p.parse_args()


def main():
    args = parse_args()

    with open(args.log, "r", encoding="utf-8") as f:
        log = json.load(f)

    data_path = Path(args.log).parent / "forum-data.json"
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    posts = data.get("posts", [])
    discussion_id = log.get("discussion_id")

    lines = [
        "-- Fix timestamps for imported ProBoards posts",
        f"-- Discussion ID: {discussion_id}",
        "-- Run this against Flarum's MySQL database",
        "",
        "SET NAMES utf8mb4;",
        "",
    ]

    # Precisamos mapear: posição ordinal do post → flarum post ID
    # O import-log não guarda mapping de postId original → flarum post ID por padrão
    # Então geramos baseado na ordem de criação (posts são criados sequencialmente)
    # Primeiro: buscar no log se há mapping de posts

    # Abordagem segura: gerar SQL que usa o número de série do post
    # Como posts são criados em ordem na discussão, podemos usar:
    #   SELECT id FROM posts WHERE discussion_id = X ORDER BY created_at ASC LIMIT 1 OFFSET N
    # Mas isso é frágil. Melhor: gerar UPDATEs com subquery.

    lines.append(f"-- Atualizando {len(posts)} posts na discussão {discussion_id}")
    lines.append("")

    for idx, post in enumerate(posts):
        ts = post.get("timestamp")
        if not ts:
            continue

        dt = datetime.fromtimestamp(ts / 1000, tz=timezone.utc)
        mysql_dt = dt.strftime("%Y-%m-%d %H:%M:%S")

        # Cada post na discussão, em ordem de criação (primeiro post = discussion, dep replies)
        # Offset = idx (0 = primeiro post / discussion starter)
        lines.append(
            f"UPDATE posts SET created_at = '{mysql_dt}', edited_at = NULL "
            f"WHERE discussion_id = {discussion_id} "
            f"ORDER BY created_at ASC LIMIT 1 OFFSET {idx};"
        )

    # Também atualiza a discussão
    first_ts = posts[0].get("timestamp") if posts else None
    if first_ts:
        dt = datetime.fromtimestamp(first_ts / 1000, tz=timezone.utc)
        mysql_dt = dt.strftime("%Y-%m-%d %H:%M:%S")
        lines.append("")
        lines.append(f"UPDATE discussions SET created_at = '{mysql_dt}', comment_count = {len(posts)} WHERE id = {discussion_id};")

    sql = "\n".join(lines)
    Path(args.output).write_text(sql, encoding="utf-8")
    print(f"SQL gerado: {args.output} ({len(lines)-7} comandos)")
    print("Importante: revise antes de executar em produção!")


if __name__ == "__main__":
    main()

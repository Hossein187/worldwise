import sqlite3
import sys

DB = r"C:\Users\Asus\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row

query = sys.argv[1] if len(sys.argv) > 1 else "tables"
param = sys.argv[2] if len(sys.argv) > 2 else ""

if query == "tables":
    rows = conn.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").fetchall()
    for r in rows:
        print(r["name"])

elif query == "schema":
    rows = conn.execute("SELECT sql FROM sqlite_master WHERE type='table' ORDER BY name").fetchall()
    for r in rows:
        print(r["sql"])
        print("---")

elif query == "sessions":
    proj = param
    if proj:
        rows = conn.execute("SELECT id, title, directory, time_created FROM session WHERE directory LIKE ? ORDER BY time_created DESC LIMIT 30", (f"%{proj}%",)).fetchall()
    else:
        rows = conn.execute("SELECT id, title, directory, time_created FROM session ORDER BY time_created DESC LIMIT 30").fetchall()
    for r in rows:
        print(f"{r['id']} | {r['time_created']} | {r['title'][:80] if r['title'] else ''} | {r['directory'][:80] if r['directory'] else ''}")

elif query == "session_detail":
    sid = param
    rows = conn.execute("SELECT id, title, directory, time_created FROM session WHERE id = ?", (sid,)).fetchall()
    for r in rows:
        print(f"ID: {r['id']}")
        print(f"Title: {r['title']}")
        print(f"Dir: {r['directory']}")
        print(f"Created: {r['time_created']}")

elif query == "messages":
    sid = param
    rows = conn.execute("""
        SELECT m.id, m.agent_id, m.time_created, json_extract(m.data, '$.role') as role
        FROM message m
        WHERE m.session_id = ?
        ORDER BY m.time_created
    """, (sid,)).fetchall()
    for r in rows:
        print(f"{r['id']} | {r['time_created']} | {r['role']} | agent={r['agent_id'] or 'main'}")

elif query == "user_keywords":
    keyword = param
    rows = conn.execute("""
        SELECT m.session_id, m.time_created, 
               substr(json_extract(p.data, '$.text'), 1, 500) as text_preview
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE json_extract(m.data, '$.role') = 'user'
          AND json_extract(p.data, '$.type') = 'text'
          AND json_extract(p.data, '$.text') LIKE ?
        ORDER BY m.time_created DESC
        LIMIT 50
    """, (f"%{keyword}%",)).fetchall()
    for r in rows:
        print(f"[{r['session_id']}] {r['time_created']} | {r['text_preview'][:300]}")
        print("---")

elif query == "assistant_parts":
    sid = param
    rows = conn.execute("""
        SELECT m.id, m.agent_id,
               json_extract(p.data, '$.type') as part_type,
               json_extract(p.data, '$.tool') as tool,
               substr(p.data, 1, 800) as preview
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(m.data, '$.role') = 'assistant'
        ORDER BY m.time_created, p.time_created
    """, (sid,)).fetchall()
    for r in rows:
        agent = r['agent_id'] or 'main'
        ptype = r['part_type']
        tool = r['tool'] or ''
        print(f"[{agent}] {ptype} {tool} | {r['preview'][:400]}")
        print("---")

elif query == "project_sessions":
    rows = conn.execute("""
        SELECT id, title, directory, time_created 
        FROM session 
        WHERE directory LIKE '%WorlldWise%' OR directory LIKE '%WorldWise%' OR title LIKE '%WorldWise%' OR title LIKE '%WorlldWise%'
        ORDER BY time_created DESC
    """).fetchall()
    for r in rows:
        print(f"{r['id']} | {r['time_created']} | {r['title'][:80] if r['title'] else ''} | {r['directory'][:100] if r['directory'] else ''}")

elif query == "recent_sessions":
    rows = conn.execute("""
        SELECT id, title, directory, time_created 
        FROM session 
        WHERE time_created >= datetime('now', '-7 days')
        ORDER BY time_created DESC
    """).fetchall()
    for r in rows:
        print(f"{r['id']} | {r['time_created']} | {r['title'][:80] if r['title'] else ''} | {r['directory'][:100] if r['directory'] else ''}")

elif query == "message_count":
    sid = param
    rows = conn.execute("SELECT COUNT(*) as cnt FROM message WHERE session_id = ?", (sid,)).fetchone()
    print(f"Total messages: {rows['cnt']}")

elif query == "part_text":
    sid = param
    rows = conn.execute("""
        SELECT m.time_created, json_extract(m.data, '$.role') as role,
               json_extract(p.data, '$.type') as part_type,
               substr(json_extract(p.data, '$.text'), 1, 1000) as text_preview
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(p.data, '$.type') = 'text'
          AND json_extract(p.data, '$.text') IS NOT NULL
        ORDER BY m.time_created
        LIMIT 100
    """, (sid,)).fetchall()
    for r in rows:
        print(f"[{r['role']}] {r['time_created']}")
        print(r['text_preview'][:600])
        print("---")

elif query == "all_sessions":
    rows = conn.execute("""
        SELECT id, title, directory, time_created 
        FROM session 
        ORDER BY time_created DESC
    """).fetchall()
    for r in rows:
        print(f"{r['id']} | {r['time_created']} | {(r['title'] or '')[:80]} | {(r['directory'] or '')[:100]}")

elif query == "tasks":
    sid = param
    rows = conn.execute("""
        SELECT id, title, status, time_created 
        FROM task 
        WHERE session_id = ?
        ORDER BY time_created
    """, (sid,)).fetchall()
    for r in rows:
        print(f"{r['id']} | {r['status']} | {r['title'][:80] if r['title'] else ''}")

elif query == "tool_calls":
    sid = param
    rows = conn.execute("""
        SELECT json_extract(p.data, '$.tool') as tool,
               json_extract(p.data, '$.state.input') as input,
               json_extract(p.data, '$.state.output') as output
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(m.data, '$.role') = 'assistant'
          AND json_extract(p.data, '$.type') = 'tool'
          AND json_extract(p.data, '$.tool') IN ('write', 'edit', 'Read', 'Edit', 'Write')
        ORDER BY m.time_created, p.time_created
    """, (sid,)).fetchall()
    for r in rows:
        tool = r['tool']
        inp = r['input'][:200] if r['input'] else ''
        print(f"{tool} | input={inp}")
        print("---")

conn.close()

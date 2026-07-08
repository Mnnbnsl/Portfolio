---
title: "Vapor: Building a Zero-Database Ephemeral Chat Application"
date: "2026-05-20"
description: "A look into how WebSockets and in-memory stores can create fully transient chat environments where logs vanish the second you close the room."
readingTime: "3 min read"
draft: true
---

Privacy on the web is increasingly hard to guarantee. To explore fully private, transient communication, I built **Vapor**—a room-based messaging app that stores absolutely nothing on disk. There is no PostgreSQL, no MongoDB, and no Redis. Everything lives purely in the application's RAM.

If a room is empty for more than 5 minutes, the entire history is wiped, leaving zero traces.

## Managing Memory Safely

Without a persistent database, memory leaks are the primary threat. If rooms accumulate messages indefinitely, the Node.js process will eventually run out of heap memory and crash.

To protect the server, I designed a strict room garbage collection cycle:

```typescript
interface Room {
  id: string;
  clients: Set<string>;
  messages: Message[];
  lastActive: number;
}

const activeRooms = new Map<string, Room>();

// Running a GC sweep every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [roomId, room] of activeRooms.entries()) {
    if (room.clients.size === 0 && now - room.lastActive > 5 * 60 * 1000) {
      // Room is empty and inactive for 5 minutes
      activeRooms.delete(roomId);
      console.log(`Garbage collected room: ${roomId}`);
    }
  }
}, 60000);
```

## Instant Handoff

When a user joins a room, we transfer the current RAM-based history to them immediately via WebSockets. Because the message history is a simple array lookup in memory, the handshake and history load completes in single-digit milliseconds. 

Vapor shows that for specific, transient workflows, eliminating the database database layers completely can lead to simpler code and lightning-fast user interactions.

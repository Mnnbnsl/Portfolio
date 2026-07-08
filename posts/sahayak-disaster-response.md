---
title: "Sahayak: Scaling Disaster Response with Socket.IO"
date: "2026-06-15"
description: "Designing a real-time volunteer coordination and mishap tracking platform during critical situations."
readingTime: "4 min read"
draft: true
---

During natural disasters or local mishaps, communication latency can cost lives. **Sahayak** was built to solve this problem by creating an instant, real-time channel between ground volunteers and coordination hubs.

By leveraging a stack consisting of **React, Node.js, MongoDB, and Socket.IO**, we built a platform capable of handling concurrent incident reporting and map-based pin tracking.

## Real-Time Push vs Polling

In a crisis, manual refreshing is unacceptable. We selected **Socket.IO** to push incident cards to dashboard feeds immediately. When a victim or volunteer submits an incident report, it is broadcast to all active supervisors in the area within milliseconds.

```javascript
// Server-side Socket coordinator
io.on("connection", (socket) => {
  socket.on("report_incident", (data) => {
    // Save to database
    db.incidents.insert(data, (err, doc) => {
      if (!err) {
        // Broadcast to all supervisors
        socket.broadcast.emit("new_incident_alert", doc);
      }
    });
  });
});
```

## Resilience and Offline Mode

One major constraint in disaster areas is spotty internet connectivity. To prevent data loss, Sahayak utilizes local storage queues. If a report is filed while offline:
1. The incident payload is stored in IndexedDB.
2. A Service Worker listens for network status changes.
3. Once a connection is restored, the queue is drained and pushed to the server.

This offline-first strategy ensures that crucial rescue coordinate points are never lost.

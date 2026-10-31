from typing import Dict, List
from fastapi import WebSocket
import json
import logging

logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        # active_connections: user_id -> list of WebSockets
        self.active_connections: Dict[str, List[WebSocket]] = {}
        # role_connections: role -> list of WebSockets
        self.role_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: str, role: str):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)

        if role not in self.role_connections:
            self.role_connections[role] = []
        self.role_connections[role].append(websocket)
        logger.info(f"WebSocket connected: User {user_id} with role {role}")

    def disconnect(self, websocket: WebSocket, user_id: str, role: str):
        if user_id in self.active_connections:
            if websocket in self.active_connections[user_id]:
                self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

        if role in self.role_connections:
            if websocket in self.role_connections[role]:
                self.role_connections[role].remove(websocket)
            if not self.role_connections[role]:
                del self.role_connections[role]
        logger.info(f"WebSocket disconnected: User {user_id}")

    async def send_personal_message(self, message: dict, user_id: str):
        if user_id in self.active_connections:
            payload = json.dumps(message)
            for connection in self.active_connections[user_id]:
                try:
                    await connection.send_text(payload)
                except Exception as e:
                    logger.error(f"Error sending WS to user {user_id}: {e}")

    async def broadcast_to_role(self, message: dict, role: str):
        if role in self.role_connections:
            payload = json.dumps(message)
            for connection in self.role_connections[role]:
                try:
                    await connection.send_text(payload)
                except Exception as e:
                    logger.error(f"Error broadcasting WS to role {role}: {e}")

manager = ConnectionManager()

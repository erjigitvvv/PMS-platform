from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from app.core.websocket_manager import manager
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.websocket("/live")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: str = Query(...),
    role: str = Query(...)
):
    await manager.connect(websocket, user_id=user_id, role=role)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo or heartbeat
            await websocket.send_text(f"ACK: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id=user_id, role=role)
        logger.info(f"User {user_id} disconnected from WebSocket")

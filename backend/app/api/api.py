from fastapi import APIRouter
from app.api.routes import ads

api_router = APIRouter()
api_router.include_router(ads.router)
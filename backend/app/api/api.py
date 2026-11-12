from fastapi import APIRouter
from app.api.routes import ads, auth

api_router = APIRouter()
api_router.include_router(ads.router)
api_router.include_router(auth.router)
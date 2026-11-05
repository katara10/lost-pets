from fastapi import FastAPI
from app.database import engine, Base
from app.models import ad
from app.api.api import api_router
from fastapi.staticfiles import StaticFiles
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lost Pets API")
os.makedirs("static/images", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(api_router, prefix="/api")
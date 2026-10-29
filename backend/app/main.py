from fastapi import FastAPI
from app.database import engine, Base
from app.models import ad
from app.api.api import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lost Pets API")
app.include_router(api_router, prefix="/api")
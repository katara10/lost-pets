from fastapi import FastAPI
from app.database import engine, Base
from app.models import ad

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lost Pets API")
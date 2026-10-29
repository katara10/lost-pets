from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.crud import ad as crud_ad
from app.schemas import ad as schemas

router = APIRouter(prefix="/ads", tags=["ads"])

@router.get("/", response_model=List[schemas.AdResponse])
def read_ads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_ad.get_ads(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.AdResponse, status_code=status.HTTP_201_CREATED)
def create_ad(ad: schemas.AdCreate, db: Session = Depends(get_db)):
    return crud_ad.create_ad(db, ad)

@router.get("/{ad_id}", response_model=schemas.AdResponse)
def read_ad(ad_id: int, db: Session = Depends(get_db)):
    db_ad = crud_ad.get_ad(db, ad_id)
    if db_ad is None:
        raise HTTPException(status_code=404, detail="Объявление не найдено")
    return db_ad

@router.patch("/{ad_id}", response_model=schemas.AdResponse)
def update_ad(ad_id: int, ad: schemas.AdUpdate, db: Session = Depends(get_db)):
    db_ad = crud_ad.update_ad(db, ad_id, ad)
    if db_ad is None:
        raise HTTPException(status_code=404, detail="Объявление не найдено")
    return db_ad

@router.delete("/{ad_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ad(ad_id: int, db: Session = Depends(get_db)):
    db_ad = crud_ad.delete_ad(db, ad_id)
    if db_ad is None:
        raise HTTPException(status_code=404, detail="Объявление не найдено")
    return None
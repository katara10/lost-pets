from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional, Union
import uuid
import shutil
import os
from app.database import get_db
from app.crud import ad as crud_ad
from app.schemas import ad as schemas
from app.models.ad import AdImage
from app.models.user import User
from app.api.deps import get_current_user

router = APIRouter(prefix="/ads", tags=["ads"])

@router.get("/", response_model=List[schemas.AdResponse])
def read_ads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_ad.get_ads(db, skip=skip, limit=limit)

@router.get("/{ad_id}", response_model=schemas.AdResponse)
def read_ad(ad_id: int, db: Session = Depends(get_db)):
    db_ad = crud_ad.get_ad(db, ad_id)
    if db_ad is None:
        raise HTTPException(status_code=404, detail="Объявление не найдено")
    return db_ad

@router.post("/", response_model=schemas.AdResponse, status_code=status.HTTP_201_CREATED)
async def create_ad(
    type: str = Form(...),
    species: str = Form(...),
    name: str = Form(...),
    description: Optional[str] = Form(None),
    location: str = Form(...),
    date: str = Form(...),
    contact_phone: str = Form(...),
    contact_name: Optional[str] = Form(None),
    photo: Union[UploadFile, None] = File(None), 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ad_data = schemas.AdCreate(
        type=type, species=species, name=name, description=description,
        location=location, date=date, contact_phone=contact_phone, contact_name=contact_name
    )
    db_ad = crud_ad.create_ad(db, ad_data)

    if photo:
        if photo.content_type in ["image/jpeg", "image/png", "image/webp"]:
            file_extension = photo.filename.split(".")[-1]
            unique_filename = f"{uuid.uuid4()}.{file_extension}"
            file_path = f"static/images/{unique_filename}"
            
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(photo.file, buffer)
                
            db_image = AdImage(ad_id=db_ad.id, image_url=f"/static/images/{unique_filename}")
            db.add(db_image)
    
    db.commit()
    db.refresh(db_ad)
    return db_ad

@router.patch("/{ad_id}", response_model=schemas.AdResponse)
def update_ad(
    ad_id: int, 
    ad: schemas.AdUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_ad = crud_ad.update_ad(db, ad_id, ad)
    if db_ad is None:
        raise HTTPException(status_code=404, detail="Объявление не найдено")
    return db_ad

@router.delete("/{ad_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ad(
    ad_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_ad = crud_ad.delete_ad(db, ad_id)
    if db_ad is None:
        raise HTTPException(status_code=404, detail="Объявление не найдено")
    return None
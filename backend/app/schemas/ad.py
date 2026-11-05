from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from app.models.ad import AdType, AdStatus
from typing import List

class AdBase(BaseModel):
    type: AdType
    species: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    description: Optional[str] = None
    location: str
    date: datetime
    contact_phone: str
    contact_name: Optional[str] = None

class AdCreate(AdBase):
    pass

class AdUpdate(BaseModel):
    type: Optional[AdType] = None
    species: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    date: Optional[datetime] = None
    status: Optional[AdStatus] = None
    contact_phone: Optional[str] = None
    contact_name: Optional[str] = None

class AdImageResponse(BaseModel):
    id: int
    image_url: str

    class Config:
        from_attributes = True

class AdResponse(AdBase):
    id: int
    status: AdStatus
    created_at: datetime
    images: List[AdImageResponse] = []

    class Config:
        from_attributes = True

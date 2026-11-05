from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
import enum

class AdType(str, enum.Enum):
    lost = "lost"
    found = "found"

class AdStatus(str, enum.Enum):
    active = "active"
    found = "found"
    closed = "closed"

class Ad(Base):
    __tablename__ = "ads"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(AdType), nullable=False)
    species = Column(String, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    status = Column(Enum(AdStatus), default=AdStatus.active)
    contact_phone = Column(String, nullable=False)
    contact_name = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    images = relationship("AdImage", back_populates="ad", cascade="all, delete-orphan")

class AdImage(Base):
    __tablename__ = "ad_images"

    id = Column(Integer, primary_key=True, index=True)
    ad_id = Column(Integer, ForeignKey("ads.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String, nullable=False)
    
    ad = relationship("Ad", back_populates="images")
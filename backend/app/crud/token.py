from sqlalchemy.orm import Session
from app.models.token import RefreshToken
from datetime import datetime, timezone

def save_refresh_token(db: Session, user_id: int, token: str, expires_at: datetime):
    db_token = RefreshToken(user_id=user_id, token=token, expires_at=expires_at)
    db.add(db_token)
    db.commit()
    return db_token

def get_refresh_token(db: Session, token: str):
    return db.query(RefreshToken).filter(RefreshToken.token == token, RefreshToken.revoked == False).first()

def revoke_refresh_token(db: Session, token: str):
    db_token = get_refresh_token(db, token)
    if db_token:
        db_token.revoked = True
        db.commit()
    return db_token
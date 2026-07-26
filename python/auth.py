from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel

from database import SessionLocal, engine, Base
from models import User

# Create database tables
Base.metadata.create_all(bind=engine)

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Request Models
# -----------------------------

class Signup(BaseModel):
    name: str
    email: str
    password: str


class Login(BaseModel):
    email: str
    password: str


# -----------------------------
# Signup API
# -----------------------------

@router.post("/signup")
def signup(user: Signup, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == user.email).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed = pwd_context.hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Signup Successful"
    }


# -----------------------------
# Login API
# -----------------------------

@router.post("/login")
def login(user: Login, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == user.email).first()

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not pwd_context.verify(
        user.password,
        existing.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Wrong Password"
        )

    return {
        "message": "Login Successful",
        "name": existing.name,
        "email": existing.email
    }
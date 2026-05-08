from fastapi import APIRouter
from app.schemas.auth_schema import UserCreate, UserLogin
from app.services.auth_service import register_user, login_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(user: UserCreate):
    return register_user(user)


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return login_user(form_data)
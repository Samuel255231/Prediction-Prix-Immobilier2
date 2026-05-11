from fastapi import APIRouter
from app.schemas.auth_schema import UserCreate, ForgotPasswordRequest
from app.services.auth_service import register_user, login_user,request_password_reset
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(user: UserCreate):
    return register_user(user)


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return login_user(form_data)

@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest):
    return request_password_reset(data.email)
#backend\app\api\deps.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.core.config import SECRET_KEY, ALGORITHM
from app.core.database import SessionLocal
from app.models.user_model import User


# ========================
# OAUTH2
# ========================
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# ========================
# GET CURRENT USER
# ========================
from app.models.user_model import User
from app.core.database import SessionLocal

def get_current_user(token: str = Depends(oauth2_scheme)):

    db = SessionLocal()

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Token invalide")

        user = db.query(User).filter(User.id == int(user_id)).first()

        if user is None:
            raise HTTPException(status_code=401, detail="Utilisateur non trouvé")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")

    finally:
        db.close()
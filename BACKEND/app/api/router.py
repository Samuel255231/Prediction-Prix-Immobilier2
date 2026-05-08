from fastapi import APIRouter
from app.api.routes import predict, history, performance,auth,health


router = APIRouter()


router.include_router(health.router)
router.include_router(predict.router)
router.include_router(history.router)
router.include_router(performance.router)
router.include_router(auth.router)
from fastapi import APIRouter, HTTPException
from app.services.evaluation_service import load_metrics

router = APIRouter()

@router.get("/perf", summary="Performance du modèle")
def get_model_performance():
    """
    Retourne les performances du modèle (chargées depuis metrics.pkl)
    """
    try:
        metrics = load_metrics()

        return {
            "r2": round(metrics.r2, 4),
            "mse": round(metrics.mse, 4),
            "rmse": round(metrics.rmse, 4),
            "mae": round(metrics.mae, 4)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
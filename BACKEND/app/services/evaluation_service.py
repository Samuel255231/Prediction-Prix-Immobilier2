from app.core.config import METRICS_PATH
from app.schemas.output_schema import MetricsOutput
import joblib
import os
import logging

logger = logging.getLogger(__name__)

def load_metrics():
    """
    Charger les métriques sauvegardées
    """
    if not os.path.exists(METRICS_PATH):
        raise FileNotFoundError(f"metrics.pkl introuvable à {METRICS_PATH}")

    metrics = joblib.load(METRICS_PATH)
    logger.info(f"Métriques chargées: {metrics}")

    return MetricsOutput(
        r2=float(metrics.get("r2", 0)),
        mse=float(metrics.get("mse", 0)),
        rmse=float(metrics.get("rmse", 0)),
        mae=float(metrics.get("mae", 0))
    )
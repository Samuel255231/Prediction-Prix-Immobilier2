from pydantic import BaseModel

class PredictionOutput(BaseModel):
    prix_million_Ar: float
    prix_Ar: int


class MetricsOutput(BaseModel):
    r2: float
    rmse: float
    mse: float
    mae: float
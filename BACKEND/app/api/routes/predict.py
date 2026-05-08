from fastapi import APIRouter, Depends
from app.schemas.input_schema import Features
from app.services.prediction_service import predict_price
from app.schemas.output_schema import PredictionOutput
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/predict",response_model=PredictionOutput)
async  def predict(features: Features,
                   current_user = Depends(get_current_user)):
             return predict_price(features, current_user)

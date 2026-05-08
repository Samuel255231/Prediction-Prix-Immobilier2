from fastapi import APIRouter, Query, Depends
from app.services.history_service import get_history
from app.api.deps import get_current_user


router = APIRouter()

@router.get("/history")
async  def history(
            page: int = Query(1, ge=1),
            limit: int = Query(10, ge=1, le=100),

            search: str = Query(None),

            min_prix: float = Query(None),
            max_prix: float = Query(None),

            sort_by: str = Query("created_at"),
            order: str = Query("desc"),

            current_user = Depends(get_current_user)
        ):
            return get_history(page, limit, search, min_prix, max_prix, sort_by, order,current_user)
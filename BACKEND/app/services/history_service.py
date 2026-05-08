from sqlalchemy import or_, String
from app.core.database import SessionLocal
from app.models.prediction_model import PredictionHistory
from app.schemas.history_schema import HistoryItem, HistoryResponse


def get_history(page, limit, search, min_prix, max_prix, sort_by, order,current_user):

    db = SessionLocal()

    try:
        # =========================
        # BASE QUERY
        # =========================
        query = db.query(PredictionHistory).filter(PredictionHistory.user_id == current_user.id)

        # =========================
        # RECHERCHE
        # =========================
        if search:
            query = query.filter(
                or_(
                    PredictionHistory.superficie_m2.cast(String).like(f"%{search}%"),
                    PredictionHistory.nb_chambres.cast(String).like(f"%{search}%")
                )
            )

        # =========================
        # FILTRES
        # =========================
        if min_prix is not None:
            query = query.filter(PredictionHistory.prix_predit >= min_prix)

        if max_prix is not None:
            query = query.filter(PredictionHistory.prix_predit <= max_prix)

        # =========================
        # TRI sécurisé
        # =========================
        ALLOWED_SORT_FIELDS = [
            "prix_predit",
            "superficie_m2",
            "nb_chambres",
            "created_at"
        ]

        if sort_by not in ALLOWED_SORT_FIELDS:
            sort_by = "created_at"

        sort_column = getattr(PredictionHistory, sort_by)

        if order == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        # =========================
        # PAGINATION
        # =========================
        total = query.count()
        offset = (page - 1) * limit
        results = query.offset(offset).limit(limit).all()

        # =========================
        # FORMAT AVEC PYDANTIC
        # =========================
        items = [
            HistoryItem(
                id=r.id,
                prix=int(r.prix_predit * 1_000_000),
                superficie=r.superficie_m2,
                chambres=r.nb_chambres,
                nb_etages=r.nb_etages,
                localisation=r.localisation,
                connexion = r.type_connexion,
                type_sol = r.type_sol,
                etat_maison= r.etat_maison,
                date=r.created_at
            )
            for r in results
        ]

        return HistoryResponse(
            page=page,
            limit=limit,
            total=total,
            total_pages=(total // limit) + (1 if total % limit else 0),
             user=current_user.username,
            data=items
        )

    finally:
        db.close()
function ResultCard({ result }) {
    return (
        <div className="result-card">
            <h3>Resultat de la Prediction</h3>
            <div className="result-price">
                <span className="price-label">Prix estime:</span>
                <span className="price-value">{result.prix_Ar.toLocaleString()} Ar</span>
                <span className="price-millions">({result.prix_million_Ar} M Ar)</span>
            </div>
        </div>
    );
}

export default ResultCard;
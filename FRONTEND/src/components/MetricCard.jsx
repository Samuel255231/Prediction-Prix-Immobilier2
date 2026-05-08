function MetricCard({ title, value, description }) {
    return (
        <div className="metric-card">
            <h4>{title}</h4>
            <p className="metric-value">{typeof value === 'number' ? value.toFixed(4) : value}</p>
            <p className="metric-desc">{description}</p>
        </div>
    );
}

export default MetricCard;
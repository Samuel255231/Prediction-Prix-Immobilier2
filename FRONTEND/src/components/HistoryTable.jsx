function HistoryTable({ data, loading, pagination, filters, onFilterChange, onPageChange }) {
    return (
        <div className="history-table-container">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={filters.search}
                    onChange={(e) => onFilterChange('search', e.target.value)}
                />
                <select value={filters.sort_by} onChange={(e) => onFilterChange('sort_by', e.target.value)}>
                    <option value="created_at">Date</option>
                    <option value="prix">Prix</option>
                    <option value="superficie">Superficie</option>
                </select>
                <select value={filters.order} onChange={(e) => onFilterChange('order', e.target.value)}>
                    <option value="desc">Descendant</option>
                    <option value="asc">Ascendant</option>
                </select>
            </div>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Prix (Ar)</th>
                                <th>Superficie</th>
                                <th>Chambres</th>
                                <th>Etages</th>
                                <th>Localisation</th>
                                <th>Etat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                    <td>{item.prix?.toLocaleString()}</td>
                                    <td>{item.superficie}</td>
                                    <td>{item.chambres}</td>
                                    <td>{item.nb_etages}</td>
                                    <td>{item.localisation}</td>
                                    <td>{item.etat_maison}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button disabled={pagination.page === 1} onClick={() => onPageChange(pagination.page - 1)}>
                            Precedent
                        </button>
                        <span>Page {pagination.page} / {pagination.total_pages}</span>
                        <button disabled={pagination.page >= pagination.total_pages} onClick={() => onPageChange(pagination.page + 1)}>
                            Suivant
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default HistoryTable;
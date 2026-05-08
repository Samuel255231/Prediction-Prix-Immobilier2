import { useState, useEffect } from 'react';
import { getHistory } from '../services/historyService';
import Navbar from '../components/Navbar';
import HistoryTable from '../components/HistoryTable';

function History() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, total_pages: 0 });
    const [filters, setFilters] = useState({ search: '', min_prix: '', max_prix: '', sort_by: 'created_at', order: 'desc' });

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getHistory({ ...filters, page: pagination.page, limit: pagination.limit });
            setData(result.data || []);
            setPagination(prev => ({ ...prev, total: result.total, total_pages: result.total_pages }));
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || err.message || 'Erreur lors du chargement');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [pagination.page, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    return (
        <div className="history-page">
            <Navbar />
            <div className="history-content">
                <h1>Historiques</h1>
                {error && <div className="error">{error}</div>}
                {loading && <p>Chargement...</p>}
                {!loading && !error && data.length === 0 && (
                    <p>Aucun historique trouve</p>
                )}
                <HistoryTable
                    data={data}
                    loading={loading}
                    pagination={pagination}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
                />
            </div>
        </div>
    );
}

export default History;
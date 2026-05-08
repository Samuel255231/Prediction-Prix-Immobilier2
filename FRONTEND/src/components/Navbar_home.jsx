import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

function Navbar_home() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">

            <div className="nav-links">
                <Link to="/">Accueil</Link>
                <Link to="/login">Se connecter</Link>
                <Link to="/register">S'inscrire</Link>
                <button onClick={toggleTheme} className="theme-toggle" title="Changer de thème">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar_home;
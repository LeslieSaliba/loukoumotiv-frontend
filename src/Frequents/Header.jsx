import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../userInfo/getTeamData";
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import logo_blanc from '../assets/Logo_complet_blanc.png';
import logo_mauve from '../assets/Logo_complet_mauve.png';

function Header() {
    const navigate = useNavigate();
    const role = getUserRole();
    const token = localStorage.getItem('token');
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const loggedIn = token;
        setIsLoggedIn(loggedIn);
    }, []);

    const navigateToRole = (role) => {
        if (role === "admin") {
            navigate('/admin/toutes-les-missions')
        } else if (role === 'masseur') {
            navigate('/masseur/toutes-les-missions')
        }
    }

    return (
        <div className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className={`container-fluid navbar-bg d-flex align-items-center justify-content-between ${scrolled ? 'fixed-top' : ''}`}>
                <Link to='/'><img className="logo-navbar" src={scrolled ? logo_mauve : logo_blanc} alt="logo" /></Link>
                <ul className={`d-flex align-items-center oswald navbar-text ${scrolled ? 'text-violet' : 'text-white'}`}>
                    <Link to='/concept'><li>Concept</li></Link>
                    <Link to='/equipe'><li>Équipe</li></Link>
                    <Link to='/mission'><li>Mission</li></Link>
                    {isLoggedIn ? (
                        <button className='oswald white-button' onClick={() => navigateToRole(role)}>
                            Mon espace
                        </button>
                    ) : (
                        <Link to='/se-connecter'><button className='oswald white-button'>Nous rejoindre</button></Link>
                    )}
                    <Link to='/contact'><button className='oswald mauve-button'>Prendre une pause</button></Link>
                </ul>
            </div>
        </div>
    );
}

export default Header;
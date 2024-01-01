import { useState, useEffect } from 'react';
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import logo_blanc from '../assets/Logo_complet_blanc.png';
import logo_mauve from '../assets/Logo_complet_mauve.png';

function Header() {
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <div className={`header ${scrolled ? 'scrolled' : ''}`}>
           <div className={`container-fluid navbar-bg d-flex align-items-center justify-content-between ${scrolled ? 'fixed-top' : ''}`}>
                <a href="/"><img className="logo-navbar" src={scrolled ? logo_mauve : logo_blanc} alt="logo" /></a>
                <ul className={`d-flex align-items-center oswald navbar-text ${scrolled ? 'text-violet' : 'text-white'}`}>
                    <li>Accueil</li>
                    <li>Concept</li>
                    <li>Équipe</li>
                    <li>Mission</li>
                    <button className='oswald white-button'>Se connecter</button>
                    <button className='oswald mauve-button'>Prendre une pause</button>
                </ul>
            </div>
        </div>
    );
}

export default Header;
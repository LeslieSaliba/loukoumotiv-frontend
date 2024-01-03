import { useState, useEffect } from 'react';
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import logo_blanc from '../assets/Logo_complet_blanc.png';
import logo_mauve from '../assets/Logo_complet_mauve.png';
import burger_blanc from '../assets/icones/burger_blanc.png';
import burger_mauve from '../assets/icones/burger_mauve.png';
import close_menu from '../assets/icones/supprimer_noir.png';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                <img
                    src={scrolled ? burger_mauve : burger_blanc}
                    alt="Menu"
                    className={`burger-menu d-flex align-items-center oswald navbar-text ${scrolled ? 'text-violet' : 'text-white'}`}
                    onClick={toggleMenu}
                />
                <div className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
                    <img src={close_menu} alt='Close menu' onClick={toggleMenu} className='close-burger-menu'/>
                    <ul>
                        <li>Concept</li>
                        <li>Équipe</li>
                        <li>Mission</li>
                        <li><button className='oswald white-button'>Nous rejoindre</button></li>
                        <li><button className='oswald mauve-button'>Prendre une pause</button></li>
                    </ul>
                </div>

            </div>



        </div>
    );
}

export default Header;
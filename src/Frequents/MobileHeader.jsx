import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { subscribeToNewsletter } from '../redux/actions/newsletter'
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../userInfo/getTeamData";
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import logo_blanc from '../assets/Logo_complet_blanc.png';
import logo_mauve from '../assets/Logo_complet_mauve.png';
import burger_blanc from '../assets/icones/burger_blanc.png';
import burger_mauve from '../assets/icones/burger_mauve.png';
import close_menu from '../assets/icones/supprimer_noir.png';
import Téléphone from '../assets/icones/telephone_blanc.png';
import Mail from '../assets/icones/mail_blanc.png';
import Facebook from '../assets/icones/fb_blanc.png';
import Instagram from '../assets/icones/insta_blanc.png';
import LinkedIn from '../assets/icones/linkedin_blanc.png';

function MobileHeader() {
    const navigate = useNavigate();
    const role = getUserRole();
    const token = localStorage.getItem('token');
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const newsletter = useSelector((state) => state.newsletter);
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState('');

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

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setValidationError(``);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError(`Format d'email invalide`);
            return;
        }
        dispatch(subscribeToNewsletter(email));
        setEmail('');
    };

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
                <img
                    src={scrolled ? burger_mauve : burger_blanc}
                    alt="Menu"
                    className={`burger-menu d-flex align-items-center oswald navbar-text ${scrolled ? 'text-violet' : 'text-white'}`}
                    onClick={toggleMenu}
                />
                <div className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
                    <div className='sidebar-top'>
                        <img src={close_menu} alt='Close menu' onClick={toggleMenu} className='close-burger-menu' />
                        <ul>
                            <Link to='/'><li>Accueil</li></Link>
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
                            <Link to='/contact'><li><button className='oswald mauve-button'>Prendre une pause</button></li></Link>
                        </ul>
                    </div>

                    <div className="container-fluid sidebar-bottom footer-bg d-flex flex-column footer-mobile d-md-none">

                        <div className="footer-social-media d-flex flex-column">
                            <a href="tel:+33611073140"><img src={Téléphone} alt="0611073140" />06 11 07 31 40</a>
                            <a href="mailto:loukoumotiv@gmail.com"><img src={Mail} alt="loukoumotiv@gmail.com" />loukoumotiv@gmail.com</a>
                        </div>

                        <div className='social-media-icons'>
                            <a href="https://www.facebook.com/profile.php?id=100090999639657"><img src={Facebook} alt="Facebook" /></a>
                            <a href="https://www.instagram.com/loukoumotiv/"><img src={Instagram} alt="Instagram" /></a>
                            <a href="https://www.linkedin.com/company/loukoumotiv/"><img src={LinkedIn} alt="Linked In" /></a>
                        </div>

                        <div>
                            <form onClick={handleSubscribe}>
                                <p className='text-center'>Inscrivez-vous à notre newsletter</p>
                                <div className='d-flex flex-column footer-input-button'>
                                    <input
                                        type="email"
                                        placeholder='Votre email juste ici'
                                        value={email}
                                        onChange={handleInputChange}
                                    />
                                    <button className='white-button'>S'inscrire</button>
                                    {validationError && (
                                        <span className='text-danger font-italic'>{validationError}</span>
                                    )}
                                </div>

                                <span className='text-white'>© Loukoumotiv’ 2024.</span>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default MobileHeader;
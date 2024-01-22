import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { subscribeToNewsletter } from '../redux/actions/newsletter'
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import LogoVertical from '../assets/Logo_horizontal_blanc.png';
import Téléphone from '../assets/icones/telephone_blanc.png';
import Mail from '../assets/icones/mail_blanc.png';
import Facebook from '../assets/icones/fb_blanc.png';
import Instagram from '../assets/icones/insta_blanc.png';
import LinkedIn from '../assets/icones/linkedin_blanc.png';

function Footer() {
    const dispatch = useDispatch();
    const newsletter = useSelector((state) => state.newsletter);
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState('');

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

    return (
        <div>
            <div className="container-fluid footer-bg d-flex footer-desktop d-none d-md-flex">
                <div className='container d-flex align-items-end justify-content-between'>
                    <div className='d-flex footer-left'>
                    <Link to='/'><img className='footer-logo' src={LogoVertical} alt="Loukoumotiv'" /></Link>
                        <span>© Loukoumotiv’ 2024.</span>
                    </div>
                    <div>
                        <ul className='footer-li'>
                            <li>Notre vision</li>
                            <li>Notre équipe</li>
                            <li>Votre projet</li>
                            <li>Nous rejoindre</li>
                        </ul>
                        <div className="footer-social-media d-flex flex-column">
                            <a href="tel:+33611073140"><img src={Téléphone} alt="0611073140" />06 11 07 31 40</a>
                            <a href="mailto:loukoumotiv@gmail.com"><img src={Mail} alt="loukoumotiv@gmail.com" />loukoumotiv@gmail.com</a>
                        </div>
                    </div>
                    <div>
                        <form className='footer-right' onSubmit={handleSubscribe}>
                            <p>Inscrivez-vous à notre newsletter <br />pour recevoir nos actualités bien-être</p>
                            <div className='d-flex footer-input-button'>
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
                            <div className='social-media-icons'>
                                <a href="https://www.facebook.com/profile.php?id=100090999639657"><img src={Facebook} alt="Facebook" /></a>
                                <a href="https://www.instagram.com/loukoumotiv/"><img src={Instagram} alt="Instagram" /></a>
                                <a href="https://www.linkedin.com/company/loukoumotiv/"><img src={LinkedIn} alt="Linked In" /></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Footer;
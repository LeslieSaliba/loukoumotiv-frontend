import '../CSS/Login.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import transmission from '../assets/icones/partage_blanc.png';
import équipe from '../assets/icones/team_blanc.png';
import inédit from '../assets/icones/event_blanc.png';

function HeroLogin() {

    return (
        <div>
            <h1 className='oswald shadow-text text-center hero-title'>Embarquez à bord de la Loukoumotiv’</h1>
            <h4 className='oswald shadow-text text-center hero-subtitle'>Sur les rails du bien-être</h4>

            <div className='d-flex justify-content-center trois-blocs trois-blocs-login'>
                <div>
                    <img src={transmission} alt="Transmission" />
                    <p className='text-center'>Transmission</p>
                    <p className='text-center font-italic'>Notre engagement de transmission implique le partage non seulement de compétences techniques, mais aussi des valeurs définissant notre approche bienveillante et collective.</p>
                </div>
                <div>
                    <img src={équipe} alt="Esprit d’équipe" />
                    <p className='text-center'>Esprit d’équipe</p>
                    <p className='text-center font-italic'>La collaboration harmonieuse des loukoums masseurs favorise le partage d'idées et le respect mutuel, créant ainsi une dynamique positive axée sur l'épanouissement individuel.</p>
                </div>
                <div className='third-bloc'>
                    <img src={inédit} alt="Inédit" />
                    <p className='text-center'>Inédit</p>
                    <p className='text-center font-italic'>Avec Loukoumotiv, découvre des lieux atypiques  pour partager votre passion du massage.</p>
                </div>
            </div>
        </div >
    );
}

export default HeroLogin;
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import corporate from '../assets/icones/corporate_blanc.png';
import event from '../assets/icones/event_blanc.png';
import social from '../assets/icones/sante2_blanc.png';

function HeroHomepage() {

    return (
        <div>
            <h1 className='oswald shadow-text text-center hero-title'>Il est temps de prendre<br />une (vraie) pause</h1>
            <h4 className='oswald shadow-text text-center hero-subtitle'>Loukoumotiv' au service de votre bien-être</h4>

            <div className='d-flex justify-content-center trois-blocs trois-blocs-homepage'>
                <div>
                    <img src={corporate} alt="corporatif" />
                    <p className='text-center'>Sur votre lieu <br />de travail</p>
                </div>
                <div>
                    <img src={event} alt="événementiel" />
                    <p className='text-center'>Sur vos événements <br />festifs ou sportifs</p>
                </div>
                <div className='third-bloc'>
                    <img src={social} alt="social" />
                    <p className='text-center'>En milieu associatif <br />et hospitalier</p>
                </div>
            </div>
        </div >
    );
}

export default HeroHomepage;
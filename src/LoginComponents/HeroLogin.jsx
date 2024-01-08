import '../CSS/Login.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import corporate from '../assets/icones/corporate_blanc.png';
import event from '../assets/icones/event_blanc.png';
import social from '../assets/icones/sante2_blanc.png';

function HeroLogin() {

    return (
        <div>
            <h1 className='oswald shadow-text text-center hero-title'>xxx</h1>
            <h4 className='oswald shadow-text text-center hero-subtitle'>xxx</h4>

            <div className='d-flex justify-content-center trois-blocs trois-blocs-login'>
                <div>
                    <img src={corporate} alt="corporatif" />
                    <p className='text-center'>Corporatif</p>
                </div>
                <div>
                    <img src={event} alt="événementiel" />
                    <p className='text-center'>Événementiel</p>
                </div>
                <div className='third-bloc'>
                    <img src={social} alt="social" />
                    <p className='text-center'>Social</p>
                </div>
            </div>
        </div >
    );
}

export default HeroLogin;
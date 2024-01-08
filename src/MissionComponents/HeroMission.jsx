import '../CSS/Mission.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import contact from '../assets/icones/discussion_blanc.png';
import massage from '../assets/icones/massage_blanc.png';
import relaxation from '../assets/icones/bien-etre_blanc.png';

function HeroMission() {

    return (
        <div>
            <div className='d-flex flex-column align-items-center'>
                <h1 className='oswald shadow-text text-center hero-title'>Départ imminent : détente</h1>
                <button className='mauve-button text-center'>Réserver une mission</button>
            </div>
            <h4 className='oswald shadow-text text-center hero-subtitle'>3 gares pour la destination bien-être</h4>

            <div className='d-flex justify-content-center trois-blocs trois-blocs-mission'>
                <div>
                    <img src={contact} alt="prise de contact" />
                    <p className='text-center'>Prise de contact</p>
                </div>
                <div>
                    <img src={massage} alt="massage" />
                    <p className='text-center'>Intervention de nos loukoums masseurs</p>
                </div>
                <div className='third-bloc'>
                    <img src={relaxation} alt="relaxation" />
                    <p className='text-center'>Un temps pour vous</p>
                </div>
            </div>
        </div >
    );
}

export default HeroMission;
import { Link } from "react-router-dom";
import '../CSS/Concept.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import corporate from '../assets/icones/corporate_blanc.png';
import event from '../assets/icones/event_blanc.png';
import social from '../assets/icones/sante2_blanc.png';

function HeroConcept() {

    return (
        <div>
            <div className='d-flex flex-column align-items-center'>
                <h1 className='oswald shadow-text text-center hero-title'>Il est temps de faire une (vraie) pause</h1>
                <Link to='/contact'><button className='mauve-button text-center'>Réserver une mission</button></Link>
            </div>
            <h4 className='oswald shadow-text text-center hero-subtitle'>xxx</h4>
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

export default HeroConcept;
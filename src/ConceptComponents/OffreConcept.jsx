import '../CSS/Concept.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import loukoum from '../assets/icones/loukoum_mauve.png';
import chaise from '../assets/chaise.png';

function OffreConcept() {

    return (
           <div className='container bienfaits-container offre-container d-lg-flex d-md-block text-photo-bloc'>
            <div className='texte-du-bloc'>
                <h4 className='oswald'>xxx</h4>
                <div className='bullets-bienfaits'>
                    <div className='d-flex'>
                        <img className='loukoum-icon' src={loukoum} alt="loukoum" />
                        <p>Loukoumotiv’ propose des expériences uniques de massage assis pour une détente et une revitalisation.</p>
                    </div>
                    <div className='d-flex'>
                        <img className='loukoum-icon' src={loukoum} alt="loukoum" />
                        <p>Notre équipe d'ostéopathes et de masseurs professionnels met l’accent sur la pause - le temps pour soi. </p>
                    </div>
                    <div className='d-flex'>
                        <img className='loukoum-icon' src={loukoum} alt="loukoum" />
                        <p>Nous mettons l'accent sur le massage et les outils de relaxation, conseillant sur les piliers de la santé : sommeil, alimentation et mouvement.</p>
                    </div>
                </div>
                <button className='mauve-button en-savoir-plus'>Prendre une pause</button>
            </div>
            <div className='d-flex justify-content-center'>
                <img className='chaise-photo' src={chaise} alt="chaise AMMA" />
            </div>
        </div >
    );
}

export default OffreConcept;
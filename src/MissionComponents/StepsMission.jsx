import '../CSS/Mission.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import loukoum from '../assets/icones/loukoum_mauve.png';
import massage from '../assets/massage2.png';

function StepsMission() {

    return (
        <div className='container bienfaits-container steps-container d-lg-flex d-md-block text-photo-bloc'>
            <div className='texte-du-bloc'>
                <h4 className='oswald'>xxx</h4>
                <div className='bullets-bienfaits'>
                    <div className='d-flex'>
                        <img className='loukoum-icon' src={loukoum} alt="1" />
                        <p>Contactez-nous pour définir ensemble votre projet de bien-être.</p>
                    </div>
                    <div className='d-flex'>
                        <img className='loukoum-icon' src={loukoum} alt="2" />
                        <p>Nos équipes interviennent dans vos locaux pour créer un espace de détente.</p>
                    </div>
                    <div className='d-flex'>
                        <img className='loukoum-icon' src={loukoum} alt="Détente" />
                        <p>Vos collaborateurs profitent de 10 à 20 minutes de relaxation, avec nos masseurs disponibles pour des conseils supplémentaires sur le bien-être.</p>
                    </div>
                </div>
                <button className='mauve-button en-savoir-plus'>Prendre une pause</button>
            </div>
            <div className='d-flex justify-content-center'>
                <img className='bloc-photo' src={massage} alt="chaise AMMA" />
            </div>
        </div >
    );
}

export default StepsMission;
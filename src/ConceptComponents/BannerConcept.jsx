import '../CSS/Concept.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import loukoum_blanc from '../assets/icones/loukoum_blanc.png';

function BannerConcept() {

    return (
        <div className='container-fluid loukoumBG-container'>
            <div className='container loukoum-container d-flex align-items-center'>
                <div className='loukoum-image'><img src={loukoum_blanc} alt="loukoum" /></div>
                <div className='loukoum-meaning'>
                    <p>Loukoum se dit « <span className='font-italic'> raha </span>» en arabe, ce qui signifie aussi « <span className='fw-bold'>confort</span> ». Locomotive est le véhicule ferroviaire qui fournit l'<span className='fw-bold'>énergie motrice </span>d'un train.</p>
                    <p>Loukoumotiv' est un <span className='fw-bold'>transporteur de confort</span> sous forme d'un collectif qui se regroupe par passion, via une connaissance et une expérience communes : le massage.</p>
                </div>
            </div>
        </div >
    );
}

export default BannerConcept;
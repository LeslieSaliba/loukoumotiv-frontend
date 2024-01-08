import '../CSS/Contact.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import corporate from '../assets/icones/corporate_blanc.png';
import event from '../assets/icones/event_blanc.png';
import social from '../assets/icones/sante2_blanc.png';

function HeroContact() {

    return (
        <div>
            <h1 className='oswald shadow-text text-center il-est-temps'>Prochain arrêt : détente !</h1>
            <h4 className='oswald shadow-text text-center wagon-bien-etre'>À chacun son wagon bien-être à bord de la Loukoumotiv’</h4>

            <div className='d-flex justify-content-center trois-blocs-contact'>
                <div>
                    <img src={corporate} alt="corporatif" />
                    <p className='text-center'>Corporatif</p>
                    <p className='text-center font-italic'>Vous avez envie d’une session de massage assis dans vos locaux ? Nous œuvrons à l’amélioration de votre qualité de vie et du bien-être au travail !</p>
                </div>
                <div>
                    <img src={event} alt="événementiel" />
                    <p className='text-center'>Événementiel</p>
                    <p className='text-center font-italic'>Vous organisez un événement et vous souhaitez une animation humaine avec une bulle de bien-être pour vos invités ?  Embarquez à bord de notre Loukoumotiv’ !</p>
                </div>
                <div>
                    <img src={social} alt="social" />
                    <p className='text-center'>Social</p>
                    <p className='text-center font-italic'>Vous dirigez une association à but non lucratif, œuvrez pour un service d’intérêt général ? Contactez-nous pour un partenariat !</p>
                </div>
            </div>
        </div >
    );
}

export default HeroContact;
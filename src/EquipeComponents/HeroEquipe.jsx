import '../CSS/Equipe.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import solidarite from '../assets/icones/solidarite_blanc.png';
import partage from '../assets/icones/partage_blanc.png';
import pause from '../assets/icones/sablier_blanc.png';

function HeroEquipe() {

    return (
        <div>
            <div className='d-flex flex-column align-items-center'>
            <h1 className='oswald shadow-text text-center il-est-temps'>Voyagez entre de bonnes mains</h1>
            <button className='mauve-button text-center'>Réserver une mission</button>
            </div>
            <h4 className='oswald shadow-text text-center notre-point-commun'>Notre point commun : la passion du bien-être !</h4>

            <div className='d-flex justify-content-center trois-blocs trois-blocs-equipe'>
                <div>
                    <img src={solidarite} alt="solidarité" />
                    <p className='text-center'>Solidarité</p>
                    <p className='text-center font-italic'>Envie de populariser le bien-être, partager notre passion avec le plus grand nombre en donnant de notre temps</p>
                </div>
                <div>
                    <img src={partage} alt="partage" />
                    <p className='text-center'>Partage</p>
                    <p className='text-center font-italic'>La découverte du bien-être ne se résume pas qu'au massage, c'est une transmission d'outil de relaxation, qui tend vers une vision globale de l'être humain.</p>
                </div>
                <div>
                    <img src={pause} alt="pause" />
                    <p className='text-center'>Pause</p>
                    <p className='text-center font-italic'>Essentielle mais négligée. Notre vocation est de vous faire explorer tous les bienfaits méconnus de cet arrêt dans le temps.</p>
                </div>
            </div>
        </div >
    );
}

export default HeroEquipe;
import { Link } from "react-router-dom";
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
            <h1 className='oswald shadow-text text-center hero-title'>Voyagez entre de bonnes mains</h1>
            <Link to='/contact'><button className='mauve-button text-center'>Réserver une mission</button></Link>
            </div>
            <h4 className='oswald shadow-text text-center hero-subtitle'>Notre point commun : la passion du bien-être !</h4>

            <div className='d-flex justify-content-center trois-blocs trois-blocs-equipe'>
                <div>
                    <img src={solidarite} alt="solidarité" />
                    <p className='text-center'>Solidarité</p>
                    <p className='text-center font-italic'>Populariser le bien-être en partageant notre passion et en consacrant du temps à autrui.</p>
                </div>
                <div>
                    <img src={partage} alt="partage" />
                    <p className='text-center'>Partage</p>
                    <p className='text-center font-italic'>Enseigner en donnant de soi, cette idée a guidé notre projet. Le bien-être va au-delà du massage ; il s'agit de transmettre des outils de relaxation pour une vision holistique de l'être humain.</p>
                </div>
                <div className='third-bloc'>
                    <img src={pause} alt="pause" />
                    <p className='text-center'>Pause</p>
                    <p className='text-center font-italic'>Souvent négligée, elle est essentielle. Notre objectif est de vous faire découvrir les nombreux bienfaits souvent méconnus de cette pause dans le temps.</p>
                </div>
            </div>
        </div >
    );
}

export default HeroEquipe;
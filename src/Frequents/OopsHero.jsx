import { Link } from "react-router-dom";
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import oops from '../assets/icones/oops_blanc.png'

function OopsHomepage() {

    return (
        <div className="d-flex flex-column justify-content-center align-items-center oops-container">
            <img src={oops} alt="Oops" className="oops-icon"/>
            <h1 className='oswald shadow-text text-center'>Oups, cette page n'existe pas.</h1>
            <h4 className='oswald shadow-text text-center oops-subtitle'><Link to='/'>Retour à la page principale.</Link></h4>
        </div >
    );
}

export default OopsHomepage;
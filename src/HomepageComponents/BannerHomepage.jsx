import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import schemaUneHeure from '../assets/schema-une-heure.png';

function BannerHomepage() {

    return (
        <div className='container-fluid banner-mauve'>
            <h4 className='oswald text-center banner-title'>Grâce à nos partenaires, nous intervenons en milieu associatif</h4>
            <img className='schema-une-heure' src={schemaUneHeure} alt="1h = 1h" />
        </div >
    );
}

export default BannerHomepage;
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import HeroHomepage from '../HomepageComponents/HeroHomepage';
import BienfaitsHomepage from '../HomepageComponents/BienfaitsHomepage';
import BannerHomepage from '../HomepageComponents/BannerHomepage';
import ClientsHomepage from '../HomepageComponents/ClientsHomepage';
import Footer from '../Frequents/Footer';

function Homepage() {

    return (
        <div>
            <div className='hero-bg'>
                <Header />
                <HeroHomepage />
                <BienfaitsHomepage />
                <BannerHomepage />
                <ClientsHomepage />
                <Footer />
            </div>
        </div >
    );
}

export default Homepage;
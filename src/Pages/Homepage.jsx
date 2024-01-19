import { useEffect } from 'react';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroHomepage from '../HomepageComponents/HeroHomepage';
import BienfaitsHomepage from '../HomepageComponents/BienfaitsHomepage';
import BannerHomepage from '../HomepageComponents/BannerHomepage';
import ClientsHomepage from '../HomepageComponents/ClientsHomepage';
import Footer from '../Frequents/Footer';
import MobileFooter from '../Frequents/MobileFooter';

function Homepage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className='hero-bg-homepage'>
                <div className='d-none d-md-block'>
                    <Header />
                </div>
                <div className='d-md-none'>
                    <MobileHeader />
                </div>
                <HeroHomepage />
            </div>
            <BienfaitsHomepage />
            <BannerHomepage />
            <ClientsHomepage />
            <div className='d-none d-md-block'>
                <Footer />
            </div>
            <div className='d-md-none'>
                <MobileFooter />
            </div>
        </div >
    );
}

export default Homepage;
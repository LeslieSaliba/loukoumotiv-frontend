import { useEffect } from 'react';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroEquipe from '../EquipeComponents/HeroEquipe';
import CoreEquipe from '../EquipeComponents/CoreEquipe';
import BannerEquipe from '../EquipeComponents/BannerEquipe';
import InstagramEquipe from '../EquipeComponents/InstagramEquipe';
import Footer from '../Frequents/Footer';

function Equipe() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div>
            <div className='hero-bg-equipe'>
                <div className='d-none d-md-block'>
                    <Header />
                </div>
                <div className='d-md-none'>
                    <MobileHeader />
                </div>
                <HeroEquipe />
            </div>
            <CoreEquipe />
            <BannerEquipe />
            <InstagramEquipe />
            <Footer />
        </div >
    );
}

export default Equipe;
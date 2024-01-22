import { useEffect } from 'react';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import OopsHero from '../Frequents/OopsHero';
import Footer from '../Frequents/Footer';
import MobileFooter from '../Frequents/MobileFooter';

function Oops() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className='hero-bg-oops'>
                <div className='d-none d-md-block'>
                    <Header />
                </div>
                <div className='d-md-none'>
                    <MobileHeader />
                </div>
                <OopsHero />
            </div>
            <div className='d-none d-md-block'>
                <Footer />
            </div>
            <div className='d-md-none'>
                <MobileFooter />
            </div>
        </div >
    );
}

export default Oops;
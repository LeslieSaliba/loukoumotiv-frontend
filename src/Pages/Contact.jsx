import { useEffect } from 'react';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroContact from '../ContactComponents/HeroContact';
import QuotationContact from '../ContactComponents/QuotationContact';
import Footer from '../Frequents/Footer';
import MobileFooter from '../Frequents/MobileFooter';

function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <div>
            <div className='hero-bg-contact'>
                <div className='d-none d-md-block'>
                    <Header />
                </div>
                <div className='d-md-none'>
                    <MobileHeader />
                </div>
                <HeroContact />
            </div>
            <QuotationContact />
            <div className='d-none d-md-block'>
                <Footer />
            </div>
            <div className='d-md-none'>
                <MobileFooter />
            </div>
        </div >
    );
}

export default Contact;
import { useEffect } from 'react';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroConcept from '../ConceptComponents/HeroConcept';
import OffreConcept from '../ConceptComponents/OffreConcept';
import BannerConcept from '../ConceptComponents/BannerConcept';
import TestimonialConcept from '../ConceptComponents/TestimonialConcept';
import Footer from '../Frequents/Footer';
import MobileFooter from '../Frequents/MobileFooter';

function Concept() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <div>
            <div className='hero-bg-concept'>
                <div className='d-none d-md-block'>
                    <Header />
                </div>
                <div className='d-md-none'>
                    <MobileHeader />
                </div>
                <HeroConcept />
            </div>
            <OffreConcept />
            <BannerConcept />
            <TestimonialConcept />
            <div className='d-none d-md-block'>
                <Footer />
            </div>
            <div className='d-md-none'>
                <MobileFooter />
            </div>
        </div >
    );
}

export default Concept;
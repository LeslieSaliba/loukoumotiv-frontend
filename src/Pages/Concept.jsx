import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroConcept from '../ConceptComponents/HeroConcept';
import OffreConcept from '../ConceptComponents/OffreConcept';
import BannerConcept from '../ConceptComponents/BannerConcept';
import TestimonialConcept from '../ConceptComponents/TestimonialConcept';
import Footer from '../Frequents/Footer';

function Concept() {

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
            <Footer />
        </div >
    );
}

export default Concept;
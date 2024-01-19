import { useEffect } from 'react';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroMission from '../MissionComponents/HeroMission';
import StepsMission from '../MissionComponents/StepsMission';
import FAQMission from '../MissionComponents/FAQMission';
import GalleryMission from '../MissionComponents/GalleryMission';
import Footer from '../Frequents/Footer';

function Mission() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <div>
            <div className='hero-bg-mission'>
                <div className='d-none d-md-block'>
                    <Header />
                </div>
                <div className='d-md-none'>
                    <MobileHeader />
                </div>
                <HeroMission />
            </div>
            <StepsMission />
            <FAQMission />
            <GalleryMission />
            <Footer />
        </div >
    );
}

export default Mission;
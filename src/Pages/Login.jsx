import { useEffect } from 'react';
import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroLogin from '../LoginComponents/HeroLogin';
import JoinFormLogin from '../LoginComponents/JoinFormLogin';
import LoginLogin from '../LoginComponents/LoginLogin';
import Footer from '../Frequents/Footer';
import MobileFooter from '../Frequents/MobileFooter';

function Login() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div>
            <div className='hero-bg-login'>
                <div className='d-none d-md-block'>
                    <Header />
                </div>
                <div className='d-md-none'>
                    <MobileHeader />
                </div>
                <HeroLogin />
            </div>
            <JoinFormLogin />
            <LoginLogin />
            <div className='d-none d-md-block'>
                <Footer />
            </div>
            <div className='d-md-none'>
                <MobileFooter />
            </div>
        </div >
    );
}

export default Login;
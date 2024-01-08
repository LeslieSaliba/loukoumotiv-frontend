import '../CSS/bootstrap.min.css';
import Header from '../Frequents/Header';
import MobileHeader from '../Frequents/MobileHeader';
import HeroLogin from '../LoginComponents/HeroLogin';
import JoinFormLogin from '../LoginComponents/JoinFormLogin';
import LoginLogin from '../LoginComponents/LoginLogin';
import Footer from '../Frequents/Footer';

function Login() {

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
            <Footer />
        </div >
    );
}

export default Login;
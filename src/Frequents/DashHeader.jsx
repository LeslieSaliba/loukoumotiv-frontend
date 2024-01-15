import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import logo from '../assets/logo_blanc.png';
import profile from '../assets/icones/profil_blanc.png';

function DashHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className='container-fluid dashboard-header'>
            <div className='container d-flex align-items-center justify-content-between'>
                <div><Link to='/'><img src={logo} alt="LOUKOUMOTIV'" className='logo-dashboard' /></Link></div>
                <div className='hello-dash'>Hello xxx</div>
                <div>
                    <img src={profile} alt="profil" className='profile-dash'/>
                    <button className='white-button' onClick={handleLogout}>Se déconnecter</button>
                </div>
            </div>
        </div>
    );
}

export default DashHeader;
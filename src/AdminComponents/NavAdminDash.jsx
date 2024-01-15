import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function NavAdminDash() {
    const [selectedSection, setSelectedSection] = useState('Missions');
    const [hoveredSection, setHoveredSection] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = (section) => {
        setSelectedSection(section);
        navigate(`/admin/${section.toLowerCase()}`);
    };

    return (
        <div className="oswald d-flex">
            <div className="container-fluid navbar-bg d-flex align-items-center justify-content-between">
                <ul className="d-flex align-items-center oswald navbar-dash">
                    {['Missions', 'Partenaires', 'Équipe', 'Répertoire', 'Newsletter'].map((section, index) => (
                        <li
                            key={index}
                            onClick={() => handleNavigation(section)}
                            onMouseEnter={() => setHoveredSection(section)}
                            onMouseLeave={() => setHoveredSection(null)}
                            className='cursor-pointer transition-all p-2'>
                            {section}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NavAdminDash;

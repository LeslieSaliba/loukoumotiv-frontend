import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function NavAdminDash() {
    const [selectedSection, setSelectedSection] = useState('Toutes les missions');
    const [hoveredSection, setHoveredSection] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = (section) => {
        const encodedSection = encodeURIComponent(section.toLowerCase().replace(/\s+/g, '-'));
        setSelectedSection(section);
        navigate(`/admin/${encodedSection}`);
    };

    return (
        <div className="oswald d-flex">
            <div className="container-fluid navbar-bg d-flex align-items-center justify-content-between">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='cancel-button nav-dropdown-dash'>
                        {selectedSection}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {['Toutes les missions', 'Mes missions', 'Partenaires', 'Équipe', 'Répertoire', 'Newsletter'].map((section, index) => (
                            <Dropdown.Item
                                key={index}
                                onClick={() => handleNavigation(section)}
                                onMouseEnter={() => setHoveredSection(section)}
                                onMouseLeave={() => setHoveredSection(null)}
                                className={hoveredSection === section ? 'cursor-pointer transition-all p-2 bg-primary text-white' : 'cursor-pointer transition-all p-2'}>
                                {section}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default NavAdminDash;
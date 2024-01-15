import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    navigate(`/masseur/${encodedSection}`);
  };

  return (
    <div className="oswald d-flex">
      <div className="container-fluid navbar-bg d-flex align-items-center justify-content-between">
        <ul className="d-flex align-items-center oswald navbar-dash">
          {['Toutes les missions', 'Mes missions'].map((section, index) => (
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

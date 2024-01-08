import React, { useState } from 'react';
import '../CSS/Equipe.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function BannerEquipe() {
    const [startIndex, setStartIndex] = useState(0);

    const teamData = [
        {
            name: 'Antoine Baudin',
            imageSrc: '../equipe/Antoine.png',
        },
        {
            name: 'Titouan De Luca',
            imageSrc: '../equipe/Titouan.png',
        },
        {
            name: 'Glenn Saliba',
            imageSrc: '../equipe/Glenn.png',
        },
        {
            name: 'Vincent Céron',
            imageSrc: '../equipe/Vincent.png',
        },
        {
            name: 'Antoine Baudin',
            imageSrc: '../equipe/Antoine.png',
        },
        {
            name: 'Titouan De Luca',
            imageSrc: '../equipe/Titouan.png',
        },
    ]

    const renderTeam = () => {
        const loopedData = [...teamData, ...teamData, ...teamData];
        const endIndex = Math.min(startIndex + 4, loopedData.length);
        return loopedData.slice(startIndex, endIndex).map((team, index) => (
            <div key={index} className='equipe-member d-flex flex-column align-items-center'>
                <img src={team.imageSrc} alt={team.name}/>
                <h6 className='text-white'>{team.name}</h6>
            </div>
        ));
    };

    const handlePrevious = () => {
        const newIndex = startIndex === 0 ? teamData.length - 1 : startIndex - 1;
        setStartIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = startIndex === teamData.length * 2 - 1 ? 0 : startIndex + 1;
        setStartIndex(newIndex);
    };

    return (
        <div className='container-fluid banner-equipe-container'>
            <div className='container d-flex justify-content-between align-items-center'>
                <h4 className='oswald equipe-title'>Et nos loukoums masseurs !</h4>
                <div className='d-flex equipe-arrows'>
                    <p onClick={handlePrevious} disabled={startIndex === 0}>
                        &lt;
                    </p>
                    <p
                        onClick={handleNext} disabled={startIndex >= teamData.length - 5}>
                        &gt;
                    </p>
                </div>
            </div>
            <div className='container d-flex justify-content-between align-items-center equipe-slider'>
                {renderTeam()}
            </div>
        </div>
    );
}

export default BannerEquipe;
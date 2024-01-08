import React, { useState } from 'react';
import '../CSS/Equipe.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function CoreEquipe() {
    const coreTeamData = [
        {
            name: 'Glenn Saliba',
            position: `Fondatrice de Loukoumotiv’ et ostéopathe`,
            imageSrc: '../equipe/Glenn.png',
        },
        {
            name: 'Aurélien Chatenet',
            position: `Responsable logistique et practicien en massage`,
            imageSrc: '../equipe/Aurelien.png',
        },
        {
            name: 'Nolwenn Chevalier',
            position: `Responsable équipe et practicienne en massage`,
            imageSrc: '../equipe/Nolwenn.JPG',
        },
        {
            name: 'Cassandra Seyi',
            position: `Responsable partenariats et marketing`,
            imageSrc: '../equipe/Glenn.png',
        },
    ]

    return (
        <div className='container d-flex align-items-center core-team'>
            {coreTeamData.map((member, index) => (
                <div key={index} className='d-flex justify-content-center align-items-center flex-column core-single'>
                    <img src={member.imageSrc} alt={member.name} />
                    <h6 className='text-center'>{member.name}</h6>
                    <p className='text-center font-italic'>{member.position}</p>
                </div>
            ))}
        </div>
    );
}

export default CoreEquipe;
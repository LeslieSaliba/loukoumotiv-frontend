import React, { useState } from 'react';
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function ClientsHomepage() {
    const [startIndex, setStartIndex] = useState(0);

    const clientData = [
        {
            name: 'Cabaret Sauvage',
            imageSrc: '../clients/cabaret-sauvage.png',
        },
        {
            name: 'EDF',
            imageSrc: '../clients/edf.png',
        },
        {
            name: 'Orange',
            imageSrc: '../clients/orange.png',
        },
        {
            name: 'Petit Bain',
            imageSrc: '../clients/petit-bain.png',
        },
        {
            name: 'Le Mazette',
            imageSrc: '../clients/le-mazette.png',
        },
        {
            name: 'Hôpital Necker',
            imageSrc: '../clients/necker.png',
        },
        {
            name: 'monMartin',
            imageSrc: '../clients/mon-martin.png',
        },
        {
            name: 'FDJ',
            imageSrc: '../clients/fdj.png',
        },
        {
            name: 'Hello Fresh',
            imageSrc: '../clients/hello-fresh.png',
        },
        {
            name: 'Enfin Lundi',
            imageSrc: '../clients/enfin-lundi.png',
        },
        {
            name: 'AG ostéo',
            imageSrc: '../clients/ag-osteo.png',
        },
    ]

    const renderClients = () => {
        const loopedData = [...clientData, ...clientData, ...clientData];
        const endIndex = Math.min(startIndex + 5, loopedData.length);
        return loopedData.slice(startIndex, endIndex).map((client, index) => (
            <div key={index}>
                <img src={client.imageSrc} alt={client.name} />
            </div>
        ));
    };

    const handlePrevious = () => {
        const newIndex = startIndex === 0 ? clientData.length - 1 : startIndex - 1;
        setStartIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = startIndex === clientData.length * 2 - 1 ? 0 : startIndex + 1;
        setStartIndex(newIndex);
    };

    return (
        <div className='container clients-container'>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className='oswald clients-title'>Ils nous ont fait confiance</h4>
                <div className='d-flex clients-arrows'>
                    <p onClick={handlePrevious} disabled={startIndex === 0}>
                        &lt;  
                    </p>
                    <p
                        onClick={handleNext} disabled={startIndex >= clientData.length - 5}>
                          &gt;
                    </p>
                </div>
            </div>
            <div className='clients-slider d-flex justify-content-between align-items-center'>
                {renderClients()}
            </div>
        </div>
    );
}

export default ClientsHomepage;
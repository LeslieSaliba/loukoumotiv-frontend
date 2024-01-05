import React, { useState } from 'react';
import '../CSS/Homepage.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function InstagramEquipe() {

    return (
        <div className='container follow-us'>
            <h4 className='text-center'>Retrouvez toutes nos aventures et
                <br />nos prochains arrêts sur Instagram !</h4>
            <a href="https://www.instagram.com/loukoumotiv/"><button className='mauve-button'>Cliquez juste ici !</button></a>
        </div>
    );
}

export default InstagramEquipe;
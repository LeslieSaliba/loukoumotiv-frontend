import React, { useState } from 'react';
import '../CSS/Concept.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function TestimonialConcept() {

    const [startIndex, setStartIndex] = useState(0);

    const testimonialData = [
        {
            review: `Les séances de massage de Loukoumotiv ont été une révélation pour mon équipe. Une pause bien-être qui a boosté la productivité et l'ambiance au bureau. Une initiative précieuse pour notre entreprise.`,
            reviewer: 'Marie xxx',
            status: ', xxx',
        },
        {
            review: `Une vraie bouffée d'oxygène ! Un moment de détente qui a apaisé mes tensions et m'a permis de retrouver un équilibre.`,
            reviewer: 'Nicolas xxx',
            status: ' ',
        },
        {
            review: `Introduire Loukoumotiv dans notre stratégie de bien-être a été une décision judicieuse. Les retours positifs des employés ont été unanime : moins de stress, plus de concentration.`,
            reviewer: 'Sarah xxx',
            status: ', Orange',
        },
        {
            review: `La présence de Loukoumotiv a ajouté une dimension de détente incroyable à notre festival. Les artistes et l'équipe ont pu se ressourcer entre les performances, et le public en redemande ! Encore merci à Glenn et ses équipes.`,
            reviewer: 'xxx',
            status: ', manager du Cabaret Sauvage',
        },
    ]

    const renderTestimonials = () => {
        const loopedData = [...testimonialData, ...testimonialData, ...testimonialData];
        const endIndex = Math.min(startIndex + 1, loopedData.length);
        return loopedData.slice(startIndex, endIndex).map((review, index) => (
            <div key={index} className='text-center single-testimonial'>
                <h4>"{review.review}"</h4>
                    <p>{review.reviewer}<span className='font-italic'>{review.status}</span></p>
            </div>
        ));
    };

    const handlePrevious = () => {
        const newIndex = startIndex === 0 ? testimonialData.length - 1 : startIndex - 1;
        setStartIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = startIndex === testimonialData.length * 2 - 1 ? 0 : startIndex + 1;
        setStartIndex(newIndex);
    };

    return (
        <div className='container clients-container'>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className='oswald clients-title'>Retours d'expérience</h4>
                <div className='d-flex clients-arrows'>
                    <p onClick={handlePrevious} disabled={startIndex === 0}>
                        &lt;
                    </p>
                    <p
                        onClick={handleNext} disabled={startIndex >= testimonialData.length - 5}>
                        &gt;
                    </p>
                </div>
            </div>
            <div className='testimonial-slider d-flex justify-content-between align-items-center'>
                {renderTestimonials()}
            </div>
        </div>
    );
}

export default TestimonialConcept;
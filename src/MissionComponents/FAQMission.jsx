import React, { useState } from 'react';
import '../CSS/Mission.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function FAQMission() {
    const [openIndex, setOpenIndex] = useState(null);

    const FAQData = [
        {
            question: `Qu'est-ce que le massage assis ? `,
            answer: `Le massage assis est une forme de massage relaxant qui se pratique sur une chaise ergonomique spéciale. Il se concentre principalement sur le dos, les épaules, le cou, les bras et la tête, et ne nécessite pas de se déshabiller.`,
        },
        {
            question: `Quels sont les avantages du massage assis ?`,
            answer: `Ce type de massage rapide offre une détente immédiate et aide à réduire le stress, améliorer la concentration et la productivité, soulager les tensions musculaires et favoriser le bien-être général des participants.`,
        },
        {
            question: `Comment se déroule une séance de massage assis lors d'un événement ou en entreprise ?`,
            answer: `Nos masseurs installent des chaises ergonomiques pour les séances de massage. Les participants restent habillés et reçoivent un massage ciblé, généralement de 10 à 20 minutes, pour se détendre et se ressourcer.`,
        },
        {
            question: `Combien de temps dure chaque session de massage assis ?`,
            answer: `Habituellement, chaque session de massage assis dure entre 10 et 20 minutes par personne, mais cela peut être adapté selon les besoins spécifiques de l'événement ou de l'entreprise.`,
        },
        {
            question: `Quelles sont les prérequis pour organiser une prestation ?`,
            answer: `Il suffit de moins d'un mètre carré pour installer une chaise AMMA (nos chaises de massage) dans vos locaux. Une mission ne nécessite rien de plus ! On se charge du reste.`,
        },
        {
            question: `Comment réserver des sessions de massage assis pour notre événement ou notre entreprise ?`,
            answer: `Pour réserver des sessions de massage assis, contactez-nous par téléphone, par e-mail ou en remplissant notre formulaire de contact. Nous discuterons des détails de l'événement ou de l'entreprise pour planifier les sessions de massage selon vos besoins.`,
        },
        {
            question: `Y a-t-il des contre-indications pour le massage assis ?`,
            answer: `Bien que le massage assis soit généralement sans danger, il est conseillé aux personnes ayant des problèmes médicaux spécifiques ou des blessures récentes de consulter leur médecin avant de recevoir un massage. Nos masseurs effectuent également des évaluations préalables pour assurer la sécurité de chaque participant.`,
        },
    ]

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='container-fluid banner-equipe-container'>
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                <h4 className='oswald FAQ-title text-center'>FAQ</h4>
                <div className='accordion questions-container' id='faqAccordion'>
                    {FAQData.map((question, index) => (
                        <div className='accordion-item' key={index}>
                            <h2 className='accordion-header' id={`heading-${index}`}>
                                <button
                                    className={`fw-bold accordion-button${openIndex === index ? '' : ' collapsed'} `}
                                    type='button'
                                    onClick={() => toggleAnswer(index)}
                                    aria-expanded={openIndex === index}
                                    aria-controls={`collapse-${index}`}
                                >
                                    {question.question}
                                </button>
                            </h2>
                            <div
                                id={`collapse-${index}`}
                                className={`accordion-collapse collapse${openIndex === index ? ' show' : ''}`}
                                aria-labelledby={`heading-${index}`}
                            >
                                <div className='accordion-body'>
                                    <p>{question.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQMission;
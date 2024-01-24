import React, { useState, useEffect } from 'react';
import Loading from '../Frequents/Loading';
import { useSelector, useDispatch } from "react-redux";
import { getAllSubscribers, subscribeToNewsletter, unsubscribeToNewsletter } from '../redux/actions/newsletter'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import { toast } from "react-hot-toast";
import remove from '../assets/icones/supprimer_noir.png';
import add from '../assets/icones/ajouter_blanc.png';

function NewsletterDash() {
    const dispatch = useDispatch();
    const newsletter = useSelector((state) => state.newsletter);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
    const [contactToUnsubscribe, setContactToUnsubscribe] = useState(null);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [email, setEmail] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getAllSubscribers())
                setLoading(false);
            } catch (error) {
                console.error('Erreur', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch])

    // setTimeout(() => {
    //     console.log("newsletter", newsletter);
    // }, 5000);

    const toggleUnsubscribeModal = (Id, email) => {
        setContactToUnsubscribe({ Id, email });
        setShowUnsubscribeModal(!showUnsubscribeModal)
    }

    const handleUnsubscribe = () => {
        if (contactToUnsubscribe && contactToUnsubscribe.Id) {
            try {
                dispatch(unsubscribeToNewsletter(contactToUnsubscribe.Id, token));
                toast.success(`Email supprimé avec succès !`)
                setTimeout(() => {
                    setShowUnsubscribeModal(false);
                    window.location.reload()
                }, 2000);
            } catch (error) {
                console.error('Erreur :', error);
                toast.error('Oups, réessayez plus tard');
            }
        }
    };

    const toggleSubscribeModal = () => {
        setShowSubscribeModal(!showSubscribeModal)
    }

    const handleSubscribe = async () => {
        try {
            if (!email) {
                console.error('Renseignez un mail à inscrire à la newsletter');
                toast.error('Renseignez un mail à inscrire à la newsletter');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error('Format d\'email invalide');
                return;
            }

            await dispatch(subscribeToNewsletter(email));
            toast.success('Inscription à la newsletter réussie !');

            setTimeout(() => {
                setShowSubscribeModal(false);
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Erreur :', error);
            toast.error('Oups, réessayez plus tard');
        }
    };

    return (
        <div className="container ">
            <div className='d-flex justify-content-end'>
                <button className="action-button add-button d-none d-md-block" onClick={() => { toggleSubscribeModal() }}>Inscrire à la newsletter</button>
                <button className='action-button add-button d-block d-md-none' onClick={() => { toggleSubscribeModal() }}><img src={add} alt="ajouter" className='add-dash' /></button>
            </div>
            <div className='scrollable-table'>
                <table className="table newsletter-table">
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Désinscrire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className='text-center'>
                                    <Loading />
                                </td>
                            </tr>
                        ) : newsletter.length === 0 ? (
                            <tr>
                                <td colSpan="9" className='text-center font-italic'>Il n'y a pas encore d'inscrits à la newsletter Loukoumotiv'</td>
                            </tr>
                        ) : (newsletter && newsletter.map((contact) => (
                            <tr key={contact._id}>
                                <td scope="row">{contact.email}</td>
                                <td>
                                    <img className='table-action-icon' src={remove} alt="supprimer" onClick={() => { toggleUnsubscribeModal(contact._id, contact.email) }} />
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>

            {showUnsubscribeModal && (
                <div className=''>
                    <Modal isOpen={toggleUnsubscribeModal} toggle={toggleUnsubscribeModal}>
                        <ModalHeader toggle={toggleUnsubscribeModal}>Retirer email de la base de données newsletter</ModalHeader>
                        <ModalBody>
                            {contactToUnsubscribe && (
                                <p>Êtes-vous sûr de vouloir désinscrire '{contactToUnsubscribe.email}' de l'équipe ?</p>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button className='action-button' onClick={() => handleUnsubscribe()}>
                                Confirmer
                            </Button>
                            <Button className='cancel-button' onClick={toggleUnsubscribeModal}>
                                Annuler
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )}

            {showSubscribeModal && (
                <div>
                    <Modal isOpen={toggleSubscribeModal} toggle={toggleSubscribeModal}>
                        < Form className="form-modal">
                            <ModalHeader toggle={toggleSubscribeModal}>Inscrire à la newsletter</ModalHeader>
                            <ModalBody>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="email">Email *</Label>
                                            <Input type="email" onChange={(e) => setEmail(e.target.value)} bsSize="sm" required />
                                        </FormGroup>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className='action-button' onClick={() => handleSubscribe()}>
                                    Inscrire
                                </Button>
                                <Button className='cancel-button' onClick={toggleSubscribeModal}>
                                    Annuler
                                </Button>
                                {validationMessage && (
                                    <span className='text-danger font-italic pt-3'>{validationMessage}</span>
                                )}
                            </ModalFooter>
                        </Form>
                    </Modal>
                </div>
            )}

        </div >
    );
}

export default NewsletterDash;
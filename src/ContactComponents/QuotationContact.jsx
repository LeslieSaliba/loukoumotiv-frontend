import { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import '../CSS/Contact.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import Téléphone from '../assets/icones/telephone_mauve.png';
import Mail from '../assets/icones/mail_mauve.png';

function QuotationContact() {
    const [state, handleSubmit] = useForm("myyryark");
    const [formData, setFormData] = useState({
        Nom_complet: "",
        Entreprise: "",
        Email: "",
        Telephone: "",
        Type: "",
        Message: "",
        Canal: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e);
        setFormData({
            Nom_complet: "",
            Entreprise: "",
            Email: "",
            Telephone: "",
            Type: "",
            Message: "",
            Canal: "",
        });
    };

    return (
        <div className="d-flex container contact-container">
            <div className="quotation-container">
                <h4 className="oswald">
                    xxx
                </h4>
                <div className="">
                    <Form className="d-flex flex-column" onSubmit={handleFormSubmit}>
                        <div className="row mb-1">
                            <div className="col-md-6">
                                <FormGroup floating>
                                    <Input
                                        type="text"
                                        id="Nom_complet"
                                        name="Nom_complet"
                                        value={formData.Nom_complet}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        className="form-control border-dark"
                                        required
                                    />
                                    <Label for="Nom_complet" className="form-label">
                                        Nom Prénom
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup floating>
                                    <Input
                                        type="text"
                                        id="Entreprise"
                                        name="Entreprise"
                                        value={formData.Entreprise}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        className="form-control border-dark"
                                        required
                                    />
                                    <Label for="Entreprise" className="form-label">
                                        Entreprise
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-md-6">
                                <FormGroup floating>
                                    <Input
                                        type="email"
                                        id="Email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="form-control border-dark"
                                        required
                                    />
                                    <Label for="Email" className="form-label">
                                        Email
                                    </Label>
                                    <ValidationError
                                        prefix="Email"
                                        field="Email"
                                        errors={state.errors}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup floating>
                                    <Input
                                        type="text"
                                        id="Telephone"
                                        name="Telephone"
                                        value={formData.Telephone}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="form-control border-dark"
                                        required
                                    />
                                    <Label for="Telephone" className="form-label">
                                        Téléphone
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup className="form-control border-dark">
                            <Label>Cadre de la prestation</Label>
                            <div className="d-flex align-items-center prestation-input">
                                <div className="me-3">
                                    <FormGroup check>
                                        <Label check className="p-2 rounded">
                                            <Input
                                                type="radio"
                                                name="Type"
                                                value="evenementiel"
                                                onChange={handleInputChange}
                                                className="form-check-input"
                                            />
                                            événementiel
                                        </Label>
                                    </FormGroup>
                                </div>
                                <div className="me-3">
                                    <FormGroup check>
                                        <Label check className="p-2 rounded">
                                            <Input
                                                type="radio"
                                                name="Type"
                                                value="en_entreprise"
                                                onChange={handleInputChange}
                                                className="form-check-input"
                                            />
                                            en entreprise
                                        </Label>
                                    </FormGroup>
                                </div>
                                <div>
                                    <FormGroup check>
                                        <Label check className="p-2 rounded">
                                            <Input
                                                type="radio"
                                                name="Type"
                                                value="projet_social"
                                                onChange={handleInputChange}
                                                className="form-check-input"
                                            />
                                            milieu associatif ou hospitalier
                                        </Label>
                                    </FormGroup>
                                </div>
                            </div>
                        </FormGroup>
                        <div className="row mb-1">
                            <div className="col-md-12">
                                <FormGroup floating>
                                    <Input
                                        type="textarea"
                                        rows="6"
                                        id="Message"
                                        name="Message"
                                        value={formData.Message}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        className="form-control border-dark"
                                        required
                                    />
                                    <Label for="Message" className="form-label">
                                        Dites-nous en plus sur votre projet (lieu, date, nombre approximatif de personnes, horaires souhaités…)
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-md-12">
                                <FormGroup floating>
                                    <Input
                                        type="textarea"
                                        rows="2"
                                        id="Canal"
                                        name="Canal"
                                        value={formData.Canal}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        className="form-control border-dark"
                                        required
                                    />
                                    <Label for="Canal" className="form-label">
                                        Comment nous avez-vous connu ?
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                        <button
                            className="mauve-button submit-quotation"
                            disabled={state.submitting}
                            type="submit"
                        >
                            Envoyer
                        </button>

                        {state.succeeded && (
                            <p>Merci pour votre message, l'équipe Loukoumotiv' revient vers vous dans les plus brefs délais. Prenez soin de vous !</p>
                        )}
                    </Form>

                </div>
            </div>
            <div className="info-container">
                <h4>xxx</h4>
                <p>Découvrez comment nous adaptons nos services pour créer un environnement relaxant répondant à vos besoins.</p>
                <div className="footer-social-media d-flex flex-column">
                    <a href="tel:+33611073140"><img src={Téléphone} alt="0611073140" />06 11 07 31 40</a>
                    <a href="mailto:loukoumotiv@gmail.com"><img src={Mail} alt="loukoumotiv@gmail.com" />loukoumotiv@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default QuotationContact;
import { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import '../CSS/Contact.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import { toast } from "react-hot-toast";
import Téléphone from '../assets/icones/telephone_mauve.png';
import Mail from '../assets/icones/mail_mauve.png';

function JoinFormLogin() {
    const [state, handleSubmit] = useForm("mzbnbqne");
    const [formData, setFormData] = useState({
        Nom_complet: "",
        Email: "",
        Telephone: "",
        Localisation: "",
        Message: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.Nom_complet || !formData.Email || !formData.Telephone || !formData.Localisation || !formData.Message ) {
            toast.error('Veuillez renseigner tous les champs');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.Email)) {
            toast.error('Format d\'email invalide');
            return;
        }
        handleSubmit(e);
        setFormData({
            Nom_complet: "",
            Email: "",
            Telephone: "",
            Localisation: "",
            Message: "",
        });
    };

    return (
        <div className="d-flex container rejoindre-container">
            <div className="candidature-container">
                <h4 className="oswald">
                    Faisons connaissance !
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
                        </div>
                        <div className="row mb-1">
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
                            <div className="col-md-6">
                                <FormGroup floating>
                                    <Input
                                        type="text"
                                        id="Localisation"
                                        name="Localisation"
                                        value={formData.Localisation}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        className="form-control border-dark"
                                        required
                                    />
                                    <Label for="Localisation" className="form-label">
                                        Localisation
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="">
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
                                        Présente-toi et décris-nous tes motivations pour rejoindre l’équipe
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                        <button
                            className="mauve-button submit-candidature"
                            disabled={state.submitting}
                            type="submit"
                        >
                            Envoyer
                        </button>

                        {state.succeeded && (
                            toast.success("Merci pour ton message, l'équipe Loukoumotiv' revient vers toi dans les plus brefs délais. Prends soin de toi !")
                        )}
                    </Form>

                </div>
            </div>
            <div className="info-container">
                <h4>Nous rejoindre</h4>
                <p>Tu souhaites travailler en équipe et partager ta passion du bien-être à travers tes massages personnalisés ? L'équipe Loukoumotiv' te tend la main !</p>
                <div className="footer-social-media d-flex flex-column">
                    <a href="tel:+33611073140"><img src={Téléphone} alt="0611073140" />06 11 07 31 40</a>
                    <a href="mailto:loukoumotiv@gmail.com"><img src={Mail} alt="loukoumotiv@gmail.com" />loukoumotiv@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default JoinFormLogin;
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from '../Frequents/formatDate';
import { getUserID } from '../userInfo/getTeamData';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import logo from '../assets/logo_blanc.png';
import profile from '../assets/icones/profil_blanc.png';
import deconnexion from '../assets/icones/deconnexion_mauve.png';

function DashHeader() {
    const navigate = useNavigate();
    const loggedMemberId = getUserID();
    const token = localStorage.getItem('token');
    const [loggedMemberInfo, setLoggedMemberInfo] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [validationMessage, setValidationMessage] = useState('test');

    const [fullName, setFullName] = useState(loggedMemberInfo.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(loggedMemberInfo.phoneNumber || '');
    const [email, setEmail] = useState(loggedMemberInfo.email || '');
    const [password, setPassword] = useState(loggedMemberInfo.password || '');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(loggedMemberInfo.dateOfBirth || '');
    const [number, setNumber] = useState(loggedMemberInfo.number || '');
    const [street, setStreet] = useState(loggedMemberInfo.street || '');
    const [ZIPcode, setZIPcode] = useState(loggedMemberInfo.ZIPcode || '');
    const [city, setCity] = useState(loggedMemberInfo.city || '');
    const [instagram, setInstagram] = useState(loggedMemberInfo.instagram || '');
    const [siret, setSiret] = useState(loggedMemberInfo.siret || '');
    const [IBAN, setIBAN] = useState(loggedMemberInfo.IBAN || '');
    const [drivingLicense, setDrivingLicense] = useState(loggedMemberInfo.drivingLicense || false);
    const [motorized, setMotorized] = useState(loggedMemberInfo.motorized || false);


    useEffect(() => {
        const fetchLoggedMemberInfo = () => {
            axios
                .get(`${process.env.REACT_APP_URL}/team/getById/${loggedMemberId}`)
                .then((response) => {
                    console.log("loggedMember: ", response.data.teamMember);
                    setLoggedMemberInfo(response.data.teamMember);
                })
                .catch((error) => {
                    console.error(`Erreur lors de l'affichage du membre `, error.message);
                });
        };

        fetchLoggedMemberInfo();
    }, [loggedMemberId]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const toggleEditModal = (loggedMemberInfo) => {
        setDrivingLicense(loggedMemberInfo.drivingLicense || false);
        setMotorized(loggedMemberInfo.motorized || false);
        console.log(loggedMemberInfo)
        setShowEditModal(!showEditModal);
    }

    const handleEdit = async () => {
        if (loggedMemberInfo && loggedMemberInfo._id) {
            const updatedFullName = fullName !== '' ? fullName : loggedMemberInfo.fullName;
            const updatedPhoneNumber = phoneNumber !== '' ? phoneNumber : loggedMemberInfo.phoneNumber;
            const updatedEmail = email !== '' ? email : loggedMemberInfo.email;
            const updatedDateOfBirth = dateOfBirth !== '' ? dateOfBirth : loggedMemberInfo.dateOfBirth;
            const updatedNumber = number !== '' ? number : loggedMemberInfo.number;
            const updatedStreet = street !== '' ? street : loggedMemberInfo.street;
            const updatedZIPcode = ZIPcode !== '' ? ZIPcode : loggedMemberInfo.ZIPcode;
            const updatedCity = city !== '' ? city : loggedMemberInfo.city;
            const updatedInstagram = instagram !== '' ? instagram : loggedMemberInfo.instagram;
            const updatedSiret = siret !== '' ? siret : loggedMemberInfo.siret;
            const updatedIBAN = IBAN !== '' ? IBAN : loggedMemberInfo.IBAN;
            const updatedDrivingLicense = Boolean(drivingLicense);
            const updatedMotorized = Boolean(motorized);
            // const updatedNotes = loggedMemberInfo.notes; 
            // const updatedJoiningDate = loggedMemberInfo.joiningDate; 
            // const updatedRole = loggedMemberInfo.role; 

            if (password != '') {
                try {
                    const formData = new FormData();
                    formData.append('fullName', updatedFullName);
                    formData.append('phoneNumber', updatedPhoneNumber);
                    formData.append('email', updatedEmail);
                    formData.append('dateOfBirth', updatedDateOfBirth);
                    formData.append('number', updatedNumber);
                    formData.append('street', updatedStreet);
                    formData.append('ZIPcode', updatedZIPcode);
                    formData.append('city', updatedCity);
                    formData.append('instagram', updatedInstagram);
                    formData.append('siret', updatedSiret);
                    formData.append('IBAN', updatedIBAN);
                    formData.append('drivingLicense', updatedDrivingLicense);
                    formData.append('motorized', updatedMotorized);
                    formData.append('password', password)

                    const response = await axios.put(`${process.env.REACT_APP_URL}/team/update/${loggedMemberId}`, formData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    console.log('Membre mis à jour avec succcès');
                    setShowEditModal(false);
                } catch (error) {
                    console.error('Erreur lors de la mise à jour du membre ', error);
                    if (error.response) {
                        console.log('Erreur lors de la mise à jour du membre')
                    }
                }
            } else {
                try {
                    const formData = new FormData();
                    formData.append('fullName', updatedFullName);
                    formData.append('phoneNumber', updatedPhoneNumber);
                    formData.append('email', updatedEmail);
                    formData.append('dateOfBirth', updatedDateOfBirth);
                    formData.append('number', updatedNumber);
                    formData.append('street', updatedStreet);
                    formData.append('ZIPcode', updatedZIPcode);
                    formData.append('city', updatedCity);
                    formData.append('instagram', updatedInstagram);
                    formData.append('siret', updatedSiret);
                    formData.append('IBAN', updatedIBAN);
                    formData.append('drivingLicense', updatedDrivingLicense);
                    formData.append('motorized', updatedMotorized);

                    const response = await axios.put(`${process.env.REACT_APP_URL}/team/update/${loggedMemberId}`, formData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    console.log('Membre mis à jour avec succcès');
                    setShowEditModal(false);
                } catch (error) {
                    console.error('Erreur lors de la mise à jour du membre ', error);
                    if (error.response) {
                        console.log('Erreur lors de la mise à jour du membre')
                    }
                }
            }

        }
    };

    return (
        <div className='container-fluid dashboard-header'>
            <div className='container d-flex align-items-center justify-content-between'>
                <div><Link to='/'><img src={logo} alt="LOUKOUMOTIV'" className='logo-dashboard' /></Link></div>
                <div className='hello-dash'>Hello {loggedMemberInfo.fullName}</div>
                <div className='responsive-dash-header d-flex align-items-center'>
                    <img src={profile} alt="profil" className='profile-dash' onClick={() => toggleEditModal(loggedMemberInfo)} />
                    <button className='white-button d-none d-md-block' onClick={handleLogout}>Se déconnecter</button>
                    <button className='white-button d-block d-md-none' onClick={handleLogout}><img src={deconnexion} alt="se déconnecter" className='deconnexion-dash' /></button>
                </div>
            </div>

            {showEditModal && (
                <div>
                    <Modal isOpen={toggleEditModal} toggle={toggleEditModal}>
                        < Form className="form-modal">
                            <ModalHeader toggle={toggleEditModal}>Mettre à jour votre profil</ModalHeader>
                            <ModalBody>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="fullName">Nom complet</Label>
                                            <Input type="text" placeholder={loggedMemberInfo.fullName} onChange={(e) => setFullName(e.target.value)} bsSize="sm" disabled />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="dateOfBirth">Date de naissance</Label>
                                            <Input type="date" defaultValue={formatDate(loggedMemberInfo.dateOfBirth)} onChange={(e) => setDateOfBirth(formatDate(e.target.value))} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="phoneNumber">Numéro de téléphone</Label>
                                            <Input type="text" placeholder={loggedMemberInfo.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="email" placeholder={loggedMemberInfo.email} onChange={(e) => setEmail(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="password">Changer votre mot de passe </Label>
                                            <Input type="password" onChange={(e) => setPassword(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="password">Confirmer votre nouveau mot de passe</Label>
                                            <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <Label for="fullAddress">Adresse</Label>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Label for="fullAddress">N°</Label>
                                                    <Input type="text" placeholder={loggedMemberInfo?.number} onChange={(e) => setNumber(e.target.value)} bsSize="sm" />
                                                </div>
                                                <div className="col-md-6">
                                                    <Label for="fullAddress">Rue</Label>
                                                    <Input type="text" placeholder={loggedMemberInfo?.street} onChange={(e) => setStreet(e.target.value)} bsSize="sm" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Label for="fullAddress">Code postal</Label>
                                                    <Input type="text" placeholder={loggedMemberInfo?.ZIPcode} onChange={(e) => setZIPcode(e.target.value)} bsSize="sm" />
                                                </div>
                                                <div className="col-md-6">
                                                    <Label for="fullAddress">Ville</Label>
                                                    <Input type="text" placeholder={loggedMemberInfo?.city} onChange={(e) => setCity(e.target.value)} bsSize="sm" />
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="instagram">Instagram (@)</Label>
                                            <Input type="text" placeholder={loggedMemberInfo?.instagram} onChange={(e) => setInstagram(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="picture">Photo</Label>
                                            {loggedMemberInfo.picture && (
                                                <img src={loggedMemberInfo.picture} alt="portrait" className='picture-team-modal' />
                                            )}
                                            <Input type="text" bsSize="sm" />
                                        </FormGroup>
                                    </div> */}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="siret">Siret</Label>
                                            <Input type="text" placeholder={loggedMemberInfo?.siret} onChange={(e) => setSiret(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="IBAN">IBAN</Label>
                                            <Input type="text" placeholder={loggedMemberInfo?.IBAN} onChange={(e) => setIBAN(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <FormGroup check>
                                                    <Label check >
                                                        <Input type="checkbox" checked={drivingLicense} onChange={(e) => setDrivingLicense(e.target.checked)} />
                                                        Permis de conduire
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12">
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="checkbox" checked={motorized} onChange={(e) => setMotorized(e.target.checked)} />
                                                        Véhiculé.e
                                                        {console.log("permis", drivingLicense + motorized)}
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button className='action-button' onClick={() => handleEdit()}>
                                    Enregistrer
                                </Button>
                                <Button className='cancel-button' onClick={toggleEditModal}>
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

        </div>
    );
}

export default DashHeader;
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
    const [loggedMemberInfo, setLoggedMemberInfo] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        joiningDate: '',
        dateOfBirth: '',
        fullAddress: {
            number: '',
            street: '',
            ZIPcode: '',
            city: ''
        },
        instagram: '',
        picture: null,
        siret: '',
        IBAN: '',
        drivingLicense: false,
        motorized: false,
    });
    const [showEditModal, setShowEditModal] = useState(false);
    //const [memberToEdit, setMemberToEdit] = useState({});
    const [validationMessage, setValidationMessage] = useState('test');

    const [fullName, setFullName] = useState(loggedMemberInfo.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(loggedMemberInfo.phoneNumber || '');
    const [email, setEmail] = useState(loggedMemberInfo.email || '');
    const [password, setPassword] = useState(loggedMemberInfo.password || '');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [joiningDate, setJoiningDate] = useState(loggedMemberInfo.joiningDate || '');
    const [dateOfBirth, setDateOfBirth] = useState(loggedMemberInfo.dateOfBirth || '');
    const [fullAddress, setFullAddress] = useState({
        number: loggedMemberInfo.number || '',
        street: loggedMemberInfo.street || '',
        ZIPcode: loggedMemberInfo.ZIPcode || '',
        city: loggedMemberInfo.city || '',
    });
    const [instagram, setInstagram] = useState(loggedMemberInfo.instagram || '');
    const [picture, setPicture] = useState(null);
    const [siret, setSiret] = useState(loggedMemberInfo.siret || '');
    const [IBAN, setIBAN] = useState(loggedMemberInfo.IBAN || '');
    const [drivingLicense, setDrivingLicense] = useState(false);
    const [motorized, setMotorized] = useState(false);

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

    console.log("zero: ", loggedMemberInfo.fullName);

    const updateMember = async (loggedMemberId, loggedMemberInfo) => {
        console.log('User ID to be updated: ', loggedMemberId);
        try {
            const response = await axios.put(`${process.env.REACT_APP_URL}/team/update/${loggedMemberId}`, loggedMemberInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    //   'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Membre mis à jour avec succcès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du membre ', error);
            if (error.response) {
                console.log('Erreur lors de la mise à jour du membre')
            }
        }
    };

    console.log("first: ", loggedMemberInfo);

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
        console.log("second: ", loggedMemberInfo);
       
    }

    const handleEdit = (loggedMemberId, updatedFields) => {
        if (loggedMemberInfo && loggedMemberInfo._id) {
            // dispatch(updateMember(memberToEdit._id, memberToEdit));
            setShowEditModal(false);
        }
    };

    return (
        <div className='container-fluid dashboard-header'>
            <div className='container d-flex align-items-center justify-content-between'>
                <div><Link to='/'><img src={logo} alt="LOUKOUMOTIV'" className='logo-dashboard' /></Link></div>
                <div className='hello-dash'>Hello {loggedMemberInfo.fullName}</div>
                <div className='responsive-dash-header d-flex align-items-center'>
                    <img src={profile} alt="profil" className='profile-dash' onClick={toggleEditModal} />
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
                                            <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} bsSize="sm" disabled />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="dateOfBirth">Date de naissance</Label>
                                            <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="phoneNumber">Numéro de téléphone</Label>
                                            <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="password">Mot de passe</Label>
                                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="password">Confirmer mot de passe</Label>
                                            <Input type="password" value={password} onChange={(e) => setConfirmPassword(e.target.value)} bsSize="sm" />
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
                                                    <Input type="text" value={fullAddress?.number} onChange={(e) => setFullAddress((prevAddress) => ({ ...prevAddress, number: e.target.value }))} bsSize="sm" />
                                                </div>
                                                <div className="col-md-6">
                                                    <Label for="fullAddress">Rue</Label>
                                                    <Input type="text" value={fullAddress?.street} onChange={(e) => setFullAddress((prevAddress) => ({ ...prevAddress, street: e.target.value }))} bsSize="sm" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Label for="fullAddress">Code postal</Label>
                                                    <Input type="text" value={fullAddress?.ZIPcode} onChange={(e) => setFullAddress((prevAddress) => ({ ...prevAddress, ZIPcode: e.target.value }))} bsSize="sm" />
                                                </div>
                                                <div className="col-md-6">
                                                    <Label for="fullAddress">Ville</Label>
                                                    <Input type="text" value={fullAddress?.city} onChange={(e) => setFullAddress((prevAddress) => ({ ...prevAddress, city: e.target.value }))} bsSize="sm" />
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="instagram">Instagram (@)</Label>
                                            <Input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="picture">Photo</Label>
                                            <img src={picture} alt="photo" />
                                            <Input type="text" value={picture} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="siret">Siret</Label>
                                            <Input type="text" value={siret} onChange={(e) => setSiret(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="IBAN">IBAN</Label>
                                            <Input type="text" value={IBAN} onChange={(e) => setIBAN(e.target.value)} bsSize="sm" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label for="joiningDate">Date de début chez Loukoumotiv'</Label>
                                            <Input type="date" value={joiningDate} bsSize="sm" disabled />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <FormGroup check>
                                                    <Label check >
                                                        <Input type="checkbox" checked={drivingLicense || false} onChange={(e) => setDrivingLicense(e.target.value)} />
                                                        Permis de conduire
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12">
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="checkbox" checked={motorized || false} onChange={(e) => setMotorized(e.target.value)} />
                                                        Véhiculé.e
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
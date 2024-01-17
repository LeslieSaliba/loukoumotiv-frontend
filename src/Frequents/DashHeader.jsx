import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMemberById, updateMember } from '../redux/actions/team'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import logo from '../assets/logo_blanc.png';
import profile from '../assets/icones/profil_blanc.png';

function DashHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const team = useSelector((state) => state.team);
    const [loggedMember, setLoggedMember] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState({});

    useEffect(() => {
        dispatch(getMemberById())
        setLoggedMember();
    }, [dispatch])

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const toggleEditModal = (loggedMember) => {
        setMemberToEdit(loggedMember);
        setShowEditModal(!showEditModal)
    }

    const handleEdit = () => {
        if (memberToEdit && memberToEdit._id) {
            dispatch(updateMember(memberToEdit._id, memberToEdit));
            setShowEditModal(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setMemberToEdit((prevMember) => ({
            ...prevMember,
            [name]: fieldValue,
        }));
    };

    return (
        <div className='container-fluid dashboard-header'>
            <div className='container d-flex align-items-center justify-content-between'>
                <div><Link to='/'><img src={logo} alt="LOUKOUMOTIV'" className='logo-dashboard' /></Link></div>
                <div className='hello-dash'>Hello xxx</div>
                <div>
                    <img src={profile} alt="profil" className='profile-dash' onClick={() => { toggleEditModal(loggedMember) }} />
                    <button className='white-button' onClick={handleLogout}>Se déconnecter</button>
                </div>
            </div>

            {showEditModal && (
                <div>
                    <Modal isOpen={toggleEditModal} toggle={toggleEditModal}>
                        {memberToEdit && (
                            < Form className="form-modal">
                                <ModalHeader toggle={toggleEditModal}>Mettre à jour le membre</ModalHeader>
                                <ModalBody>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="fullName">Nom complet</Label>
                                                <Input type="text" name="fullName" id="fullName" value={memberToEdit.fullName || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="role">Rôle</Label>
                                                <Input type="select" name="role" id="role" value={memberToEdit.role || ''} onChange={handleChange} bsSize="sm">
                                                    <option value="admin">Admin</option>
                                                    <option value="masseur">Masseur</option>
                                                </Input>
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="phoneNumber">Numéro de téléphone</Label>
                                                <Input type="text" name="phoneNumber" id="phoneNumber" value={memberToEdit.phoneNumber || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email" id="email" value={memberToEdit.email || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="password">Mot de passe</Label>
                                                <Input type="password" name="password" id="password" value={memberToEdit.password || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="dateOfBirth">Date de naissance</Label>
                                                <Input type="date" name="dateOfBirth" id="dateOfBirth" value={memberToEdit.dateOfBirth || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup>
                                                <Label for="fullAddress">Adresse</Label>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Input type="text" name="fullAddress.number" id="fullAddressNumber" value={memberToEdit.fullAddress?.number || ''} onChange={handleChange} placeholder="N° de rue" bsSize="sm" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Input type="text" name="fullAddress.street" id="fullAddressStreet" value={memberToEdit.fullAddress?.street || ''} onChange={handleChange} placeholder="Rue" bsSize="sm" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Input type="text" name="fullAddress.ZIPcode" id="fullAddressZIPcode" value={memberToEdit.fullAddress?.ZIPcode || ''} onChange={handleChange} placeholder="Code postal" bsSize="sm" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Input type="text" name="fullAddress.city" id="fullAddressCity" value={memberToEdit.fullAddress?.city || ''} onChange={handleChange} placeholder="Ville" bsSize="sm" />
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="instagram">Instagram (@)</Label>
                                                <Input type="text" name="instagram" id="instagram" value={memberToEdit.instagram || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="picture">Photo</Label>
                                                <Input type="text" name="picture" id="picture" value={memberToEdit.picture || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="siret">Siret</Label>
                                                <Input type="text" name="siret" id="siret" value={memberToEdit.siret || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="IBAN">IBAN</Label>
                                                <Input type="text" name="IBAN" id="IBAN" value={memberToEdit.IBAN || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="joiningDate">Date de début chez Loukoumotiv'</Label>
                                                <Input type="date" name="joiningDate" id="joiningDate" value={memberToEdit.joiningDate || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <FormGroup check>
                                                        <Label check >
                                                            <Input type="checkbox" name="drivingLicense" id="drivingLicense" checked={memberToEdit.drivingLicense || false} onChange={handleChange} />{' '}
                                                            Permis de conduire
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-md-12">
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox" name="motorized" id="motorized" checked={memberToEdit.motorized || false} onChange={handleChange} />{' '}
                                                            Véhiculé.e
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup>
                                                <Label for="notes">Notes</Label>
                                                <Input type="textarea" name="notes" id="notes" value={memberToEdit.notes || ''} onChange={handleChange} bsSize="sm" />
                                            </FormGroup>
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
                                </ModalFooter>
                            </Form>
                        )}
                    </Modal>
                </div>
            )}

        </div>
    );
}

export default DashHeader;
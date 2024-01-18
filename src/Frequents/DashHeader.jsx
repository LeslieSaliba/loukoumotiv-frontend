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
    const [showEditModal, setShowEditModal] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState({});
    const Id = localStorage.getItem('id');

    useEffect(() => {
        dispatch(getMemberById(Id))
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

    return (
        <div className='container-fluid dashboard-header'>
            <div className='container d-flex align-items-center justify-content-between'>
                <div><Link to='/'><img src={logo} alt="LOUKOUMOTIV'" className='logo-dashboard' /></Link></div>
                <div className='hello-dash'>Hello {team.fullName}</div>
                <div>
                    <img src={profile} alt="profil" className='profile-dash' onClick={() => { toggleEditModal(team._id) }} />
                    <button className='white-button' onClick={handleLogout}>Se déconnecter</button>
                </div>
            </div>

            {showEditModal && (
                <div>
                    <Modal isOpen={toggleEditModal} toggle={toggleEditModal}>
                        {memberToEdit && (
                            < Form className="form-modal">
                                <ModalHeader toggle={toggleEditModal}>Mettre à jour votre profil</ModalHeader>
                                <ModalBody>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="fullName">Nom complet</Label>
                                                <Input type="text" placeholder={memberToEdit.fullName || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="role">Rôle</Label>
                                                <Input type="select" placeholder={memberToEdit.role || ''} bsSize="sm">
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
                                                <Input type="text" placeholder={memberToEdit.phoneNumber || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" placeholder={memberToEdit.email || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="password">Mot de passe</Label>
                                                <Input type="password" placeholder={memberToEdit.password || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="dateOfBirth">Date de naissance</Label>
                                                <Input type="date" placeholder={memberToEdit.dateOfBirth || ''} bsSize="sm" />
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
                                                        <Input type="text" placeholder={memberToEdit.fullAddress?.number || ''} bsSize="sm" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Label for="fullAddress">Rue</Label>
                                                        <Input type="text" placeholder={memberToEdit.fullAddress?.street || ''} bsSize="sm" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Label for="fullAddress">Code postal</Label>
                                                        <Input type="text" placeholder={memberToEdit.fullAddress?.ZIPcode || ''} bsSize="sm" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Label for="fullAddress">Ville</Label>
                                                        <Input type="text" placeholder={memberToEdit.fullAddress?.city || ''} bsSize="sm" />
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="instagram">Instagram (@)</Label>
                                                <Input type="text" placeholder={memberToEdit.instagram || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="picture">Photo</Label>
                                                <Input type="text" placeholder={memberToEdit.picture || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="siret">Siret</Label>
                                                <Input type="text" placeholder={memberToEdit.siret || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="IBAN">IBAN</Label>
                                                <Input type="text" placeholder={memberToEdit.IBAN || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <Label for="joiningDate">Date de début chez Loukoumotiv'</Label>
                                                <Input type="date" placeholder={memberToEdit.joiningDate || ''} bsSize="sm" />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <FormGroup check>
                                                        <Label check >
                                                            <Input type="checkbox" checked={memberToEdit.drivingLicense || false} />
                                                            Permis de conduire
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-md-12">
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox" name="motorized" id="motorized" checked={memberToEdit.motorized || false} />{' '}
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
                                                <Input type="textarea" placeholder={memberToEdit.notes || ''} bsSize="sm" />
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
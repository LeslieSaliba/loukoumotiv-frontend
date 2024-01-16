import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllMembers, getMemberById, login, addMember, getByRole, deleteMember, updateMember, switchToMasseur, switchToAdmin } from '../redux/actions/team'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';
import add from '../assets/icones/ajouter_noir.png'

function TeamDash() {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState({});
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(getAllMembers())
  }, [dispatch])

  setTimeout(() => {
    console.log("team", team);
  }, 5000);

  const toggleEditModal = (teamMember) => {
    setMemberToEdit(teamMember);
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

  const toggleDeleteModal = (Id, fullName) => {
    setMemberToDelete({ Id, fullName });
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = () => {
    if (memberToDelete && memberToDelete.Id) {
      dispatch(deleteMember(memberToDelete.Id));
      setShowDeleteModal(false);
    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleAdd = () => {
    dispatch(addMember());
    setShowAddModal(false)
  }

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button" onClick={() => { toggleAddModal() }}>Ajouter un membre</button>
      </div>
      <table className="table scrollable-table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Localisation</th>
            <th scope="col">Permis, véhiculé.e</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {team && team.map((teamMember) => (
            <tr key={teamMember._id}>
              <td scope="row">{teamMember.fullName}</td>
              <td>{teamMember.email}</td>
              <td>{teamMember.fullAddress ? (teamMember.fullAddress.city + ' ' + teamMember.fullAddress.ZIPcode) : '-'}</td>
              <td>{teamMember.drivingLicense ? "oui" : "non"}, {teamMember.motorized ? "oui" : "non"}</td>
              <td>{teamMember.role}</td>
              <td>
                <img className='table-action-icon' src={edit} alt="modifier" onClick={() => { toggleEditModal(teamMember) }} />
                <img className='table-action-icon' src={remove} alt="supprimer" onClick={() => { toggleDeleteModal(teamMember._id, teamMember.fullName) }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {
        showDeleteModal && (
          <div className=''>
            <Modal isOpen={toggleDeleteModal} toggle={toggleDeleteModal}>
              <ModalHeader toggle={toggleDeleteModal}>Retirer un loukoum de la boîte</ModalHeader>
              <ModalBody>
                {memberToDelete && (
                  <p>Êtes-vous sûr de vouloir supprimer '{memberToDelete.fullName}' de l'équipe ?</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button className='action-button' onClick={() => handleDelete()}>
                  Confirmer
                </Button>
                <Button className='cancel-button' onClick={toggleDeleteModal}>
                  Annuler
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        )}

      {showAddModal && (
        <div>
          <Modal isOpen={toggleAddModal} toggle={toggleAddModal}>
            < Form className="form-modal">
              <ModalHeader toggle={toggleAddModal}>Ajouter un nouveau membre</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="fullName">Nom complet</Label>
                      <Input type="text" name="fullName" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="role">Rôle</Label>
                      <Input type="select" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} bsSize="sm">
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
                      <Input type="text" name="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="password">Mot de passe</Label>
                      <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="joiningDate">Date de début chez Loukoumotiv'</Label>
                      <Input type="date" name="joiningDate" id="joiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="notes">Notes</Label>
                      <Input type="textarea" name="notes" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className='action-button' onClick={() => handleAdd()}>
                  Ajouter
                </Button>
                <Button className='cancel-button' onClick={toggleAddModal}>
                  Annuler
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      )}

    </div >
  );
}

export default TeamDash;
import React, { useState, useEffect } from 'react';
import Loading from '../Frequents/Loading';
import { formatDate } from '../Frequents/formatDate';
import { useSelector, useDispatch } from "react-redux";
import { getAllMembers, addMember, deleteMember, updateMember } from '../redux/actions/team'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import { toast } from "react-hot-toast";
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';
import add from '../assets/icones/ajouter_blanc.png';

function TeamDash() {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState({});
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [fullName, setFullName] = useState(memberToEdit.fullName || '');
  const [role, setRole] = useState(memberToEdit.role || '');
  const [phoneNumber, setPhoneNumber] = useState(memberToEdit.phoneNumber || '');
  const [email, setEmail] = useState(memberToEdit.email || '');
  const [password, setPassword] = useState(memberToEdit.password || '');
  const [joiningDate, setJoiningDate] = useState(formatDate(memberToEdit.joiningDate) || '');
  const [notes, setNotes] = useState(memberToEdit.notes || '');
  const [dateOfBirth, setDateOfBirth] = useState(formatDate(memberToEdit.dateOfBirth) || '');
  const [number, setNumber] = useState(memberToEdit.number || '');
  const [street, setStreet] = useState(memberToEdit.street || '');
  const [ZIPcode, setZIPcode] = useState(memberToEdit.ZIPcode || '');
  const [city, setCity] = useState(memberToEdit.city || '');
  const [instagram, setInstagram] = useState(memberToEdit.instagram || '');
  const [picture, setPicture] = useState(null);
  const [siret, setSiret] = useState(memberToEdit.siret || '');
  const [IBAN, setIBAN] = useState(memberToEdit.IBAN || '');
  const [drivingLicense, setDrivingLicense] = useState(memberToEdit.drivingLicense || false);
  const [motorized, setMotorized] = useState(memberToEdit.motorized || false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllMembers())
        setLoading(false);
      } catch (error) {
        console.error('Erreur', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch])

  const toggleEditModal = (teamMember) => {
    setMemberToEdit(teamMember);
    setDrivingLicense(teamMember.drivingLicense || false);
    setMotorized(teamMember.motorized || false);
    setShowEditModal(!showEditModal)
  }

  const handleEdit = () => {
    try {
      // if (!phoneNumber || !email || !password) {
      //   console.error('Les champs * doivent être renseignés');
      //   toast.error('Les champs * doivent être renseignés');
      //   return;
      // }

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   toast.error('Format d\'email invalide');
      //   return;
      // }
      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      // if (!passwordRegex.test(password)) {
      //   toast.error("Mot de passe faible. Inclure au moins une majuscule, une minuscule, un chiffre et un symbole.");
      // }

      const updatedFullName = fullName !== '' ? fullName : memberToEdit.fullName;
      const updatedRole = role !== '' ? role : memberToEdit.role;
      const updatedPhoneNumber = phoneNumber !== '' ? phoneNumber : memberToEdit.phoneNumber;
      const updatedEmail = email !== '' ? email : memberToEdit.email;
      const updatedDateOfBirth = formatDate(dateOfBirth) !== '' ? formatDate(dateOfBirth) : formatDate(memberToEdit.dateOfBirth);
      const updatedNumber = number !== '' ? number : memberToEdit.number;
      const updatedStreet = street !== '' ? street : memberToEdit.street;
      const updatedZIPcode = ZIPcode !== '' ? ZIPcode : memberToEdit.ZIPcode;
      const updatedCity = city !== '' ? city : memberToEdit.city;
      const updatedInstagram = instagram !== '' ? instagram : memberToEdit.instagram;
      const updatedSiret = siret !== '' ? siret : memberToEdit.siret;
      const updatedIBAN = IBAN !== '' ? IBAN : memberToEdit.IBAN;
      const updatedJoiningDate = formatDate(joiningDate) !== '' ? formatDate(joiningDate) : formatDate(memberToEdit.joiningDate);
      const updatedDrivingLicense = Boolean(drivingLicense);
      const updatedMotorized = Boolean(motorized);
      const updatedNotes = notes !== '' ? notes : memberToEdit.notes;
      // const picture ; 

      if (memberToEdit && memberToEdit._id) {
        if (password !== '') {
          dispatch(updateMember(memberToEdit._id, updatedFullName, updatedRole, updatedPhoneNumber, updatedEmail, updatedDateOfBirth, updatedNumber, updatedStreet, updatedZIPcode, updatedCity, updatedInstagram, updatedSiret, updatedIBAN, updatedJoiningDate, updatedDrivingLicense, updatedMotorized, updatedNotes, picture, token, password));
          toast.success(`Membre mis à jour avec succès !`);
        } else {
          dispatch(updateMember(memberToEdit._id, updatedFullName, updatedRole, updatedPhoneNumber, updatedEmail, updatedDateOfBirth, updatedNumber, updatedStreet, updatedZIPcode, updatedCity, updatedInstagram, updatedSiret, updatedIBAN, updatedJoiningDate, updatedDrivingLicense, updatedMotorized, updatedNotes, picture, token));
          toast.success(`Membre mis à jour avec succès !`);
        }
        setTimeout(() => {
          setShowEditModal(false);
          // window.location.reload()
        }, 3000);
      }
    } catch (error) {
      console.error("Erreur : ", error);
      toast.error(`Oups, réessayez plus tard`)
    }
  };

  const toggleDeleteModal = (Id, fullName) => {
    setMemberToDelete({ Id, fullName });
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = () => {
    if (memberToDelete && memberToDelete.Id) {
      try {
        dispatch(deleteMember(memberToDelete.Id, token));
        toast.success(`Membre supprimé avec succès !`)
        setTimeout(() => {
          setShowDeleteModal(false);
          window.location.reload()
        }, 3000);
      } catch (error) {
        console.error("Erreur : ", error);
        toast.error("Oups, réessayez plus tard");
      }
    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleAdd = async () => {
    try {
      if (!fullName || !role || !phoneNumber || !email || !password) {
        console.error('Les champs * doivent être renseignés');
        toast.error('Les champs * doivent être renseignés');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Format d\'email invalide');
        return;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(password)) {
        toast.error("Mot de passe faible. Inclure au moins une majuscule, une minuscule, un chiffre et un symbole.");
      }

      await dispatch(addMember(fullName, role, phoneNumber, email, password, notes, token));
      toast.success("Membre ajouté avec succès!");

      setTimeout(() => {
        setShowAddModal(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Erreur : ", error);
      toast.error("Oups, réessayez plus tard");
    }
  };

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button d-none d-md-block" onClick={() => { toggleAddModal() }}>Ajouter un membre</button>
        <button className='action-button add-button d-block d-md-none' onClick={() => { toggleAddModal() }}><img src={add} alt="ajouter" className='add-dash' /></button>
      </div>
      <div className='scrollable-table'>
        <table className="table">
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
            {loading ? (
              <tr>
                <td colSpan="6" className='text-center'>
                  <Loading />
                </td>
              </tr>
            ) : team.length === 0 ? (
              <tr>
                <td colSpan="9" className='text-center font-italic'>Vous n'avez pas encore créé les comptes de la team Loukoumotiv'. </td>
              </tr>
            ) : (team && team.map((teamMember) => (
              <tr key={teamMember._id}>
                <td scope="row">{teamMember.fullName}</td>
                <td>{teamMember.email}</td>
                <td>{teamMember.city && teamMember.ZIPcode && teamMember.city != 'undefined' && teamMember.ZIPcode != 'undefined' ? `${teamMember.city}, ${teamMember.ZIPcode}` : '-'}</td>
                <td>{teamMember.drivingLicense ? "oui" : "non"}, {teamMember.motorized ? "oui" : "non"}</td>
                <td>{teamMember.role}</td>
                <td>
                  <img className='table-action-icon' src={edit} alt="modifier" onClick={() => { toggleEditModal(teamMember) }} />
                  <img className='table-action-icon' src={remove} alt="supprimer" onClick={() => { toggleDeleteModal(teamMember._id, teamMember.fullName) }} />
                </td>
              </tr>
            )))}
          </tbody>
        </table>
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
                        <Label for="fullName">Nom complet *</Label>
                        <Input type="text" placeholder={memberToEdit.fullName} onChange={(e) => setFullName(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="role">Rôle *</Label>
                        <Input type="select" defaultValue={memberToEdit.role} onChange={(e) => setRole(e.target.value)} bsSize="sm" required >
                          <option value=""></option>
                          <option value="admin">Admin</option>
                          <option value="masseur">Masseur</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="phoneNumber">Numéro de téléphone *</Label>
                        <Input type="text" placeholder={memberToEdit.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="email">Email *</Label>
                        <Input type="email" placeholder={memberToEdit.email} onChange={(e) => setEmail(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="password">Mot de passe *</Label>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="dateOfBirth">Date de naissance</Label>
                        <Input type="date" defaultValue={formatDate(memberToEdit?.dateOfBirth)} onChange={(e) => setDateOfBirth(formatDate(e.target.value))} bsSize="sm" />
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
                            <Input type="text" placeholder={memberToEdit.number != "undefined" ? memberToEdit.number : ''} onChange={(e) => setNumber(e.target.value)} bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Rue</Label>
                            <Input type="text" placeholder={memberToEdit.street != "undefined" ? memberToEdit.street : ''} onChange={(e) => setStreet(e.target.value)} bsSize="sm" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="fullAddress">Code postal</Label>
                            <Input type="text" placeholder={memberToEdit.ZIPcode != "undefined" ? memberToEdit.ZIPcode : ''} onChange={(e) => setZIPcode(e.target.value)} bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Ville</Label>
                            <Input type="text" placeholder={memberToEdit.city != "undefined" ? memberToEdit.city : ''} onChange={(e) => setCity(e.target.value)} bsSize="sm" />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="instagram">Instagram (@)</Label>
                        <Input type="text" placeholder={memberToEdit.instagram != "undefined" ? memberToEdit.instagram : ''} onChange={(e) => setInstagram(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="picture">Photo</Label>
                        {memberToEdit.picture && (
                          <img src={memberToEdit.picture} alt="portrait" className='picture-team-modal' />
                        )}
                        <Input type="file" onChange={(e) => setPicture(e.target.files[0])} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="siret">Siret</Label>
                        <Input type="text" placeholder={memberToEdit.siret != "undefined" ? memberToEdit.siret : ''} onChange={(e) => setSiret(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="IBAN">IBAN</Label>
                        <Input type="text" placeholder={memberToEdit.IBAN != "undefined" ? memberToEdit.IBAN : ''} onChange={(e) => setIBAN(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="joiningDate">Loukoum'anniversaire</Label>
                        <Input type="date" defaultValue={formatDate(memberToEdit?.joiningDate)} onChange={(e) => setJoiningDate(formatDate(e.target.value))} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup check>
                            <Label check >
                              <Input type="checkbox" checked={drivingLicense} onChange={(e) => setDrivingLicense(e.target.checked)} />
                              Permis de conduire
                              {/* {console.log("drivingLicense: ", drivingLicense)} */}
                            </Label>
                          </FormGroup>
                        </div>
                        <div className="col-md-12">
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" checked={motorized} onChange={(e) => setMotorized(e.target.checked)} />
                              Véhiculé.e
                              {/* {console.log("motorized: ", motorized)} */}
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
                        <Input type="textarea" placeholder={memberToEdit.notes ? memberToEdit.notes : ''} onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
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

      {showDeleteModal && (
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
                      <Label for="fullName">Nom complet *</Label>
                      <Input type="text" onChange={(e) => setFullName(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="role">Rôle *</Label>
                      <Input type="select" onChange={(e) => setRole(e.target.value)} bsSize="sm" required>
                        <option value=""></option>
                        <option value="admin">Admin</option>
                        <option value="masseur">Masseur</option>
                      </Input>
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="phoneNumber">Numéro de téléphone *</Label>
                      <Input type="text" onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="email">Email *</Label>
                      <Input type="email" onChange={(e) => setEmail(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="password">Mot de passe *</Label>
                      <Input type="password" onChange={(e) => setPassword(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  {/* <div className="col-md-6">
                    <FormGroup>
                      <Label for="joiningDate">Loukoum'anniversaire *</Label>
                      <Input type="date" onChange={(e) => setJoiningDate(formatDate(e.target.value))} bsSize="sm" required />
                    </FormGroup>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="notes">Notes</Label>
                      <Input type="textarea" onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
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
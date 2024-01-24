import React, { useState, useEffect } from 'react';
import Loading from '../Frequents/Loading';
import { useSelector, useDispatch } from "react-redux";
import { getAllContacts, addContact, deleteContact, updateContact } from '../redux/actions/directory'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import { toast } from "react-hot-toast";
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';
import add from '../assets/icones/ajouter_blanc.png';

function DirectoryDash() {
  const dispatch = useDispatch();
  const directory = useSelector((state) => state.directory);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState({});
  const [contactToDelete, setContactToDelete] = useState(null);

  const [fullName, setFullName] = useState(contactToEdit.fullName || '');
  const [email, setEmail] = useState(contactToEdit.email || '');
  const [phoneNumber, setPhoneNumber] = useState(contactToEdit.phoneNumber || '');
  const [position, setPosition] = useState(contactToEdit.position || '');
  const [companyName, setCompanyName] = useState(contactToEdit.companyName || '');
  const [notes, setNotes] = useState(contactToEdit.notes || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllContacts());
        setLoading(false);
      } catch (error) {
        console.error('Erreur', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch])

  const toggleEditModal = (contact) => {
    setContactToEdit(contact);
    setShowEditModal(!showEditModal)
  }

  const handleEdit = () => {
    try {
      if (contactToEdit && contactToEdit._id) {
        if (!fullName || !email || !phoneNumber || !position) {
          console.error('Les champs * doivent être renseignés');
          toast.error('Les champs * doivent être renseignés');
          return;
        }
        const updatedFullName = fullName !== '' ? fullName : contactToEdit.fullName;
        const updatedEmail = email !== '' ? email : contactToEdit.email;
        const updatedPhoneNumber = phoneNumber !== '' ? phoneNumber : contactToEdit.phoneNumber;
        const updatedPosition = position !== '' ? position : contactToEdit.position;
        const updatedCompanyName = companyName !== '' ? companyName : contactToEdit.companyName;
        const updatedNotes = notes !== '' ? notes : contactToEdit.notes;

        dispatch(updateContact(contactToEdit._id, updatedFullName, updatedEmail, updatedPhoneNumber, updatedPosition, updatedCompanyName, updatedNotes, token));
        toast.success(`Contact mis à jour avec succès !`)
        setTimeout(() => {
          setShowEditModal(false);
          window.location.reload()
        }, 3000);
      }
    } catch (error) {
      console.error("Erreur : ", error)
      toast.error(`Oups, réessayez plus tard`)
    }
  };

  const toggleDeleteModal = (Id, fullName) => {
    setContactToDelete({ Id, fullName });
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = () => {
    if (contactToDelete && contactToDelete.Id) {
      try {
        dispatch(deleteContact(contactToDelete.Id, token));
        toast.success(`Contact supprimé avec succès !`)
        setTimeout(() => {
          setShowDeleteModal(false);
          window.location.reload()
        }, 3000);
      } catch (error) {
        console.error("Erreur : ", error)
        toast.error(`Oups, réessayez plus tard`)
      }

    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleAdd = () => {
    try {
      if (!fullName || !email || !phoneNumber || !position) {
        console.error('Les champs * doivent être renseignés');
        toast.error('Les champs * doivent être renseignés');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Format d\'email invalide');
        return;
      }

      dispatch(addContact(fullName, email, phoneNumber, position, companyName, notes, token));
      toast.success(`Contact ajouté avec succès !`)
      setTimeout(() => {
        setShowAddModal(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Erreur :', error);
      toast.error(`Oups, réessayez plus tard`)
    }
  }

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button d-none d-md-block" onClick={() => { toggleAddModal() }}>Ajouter un contact</button>
        <button className='action-button add-button d-block d-md-none' onClick={() => { toggleAddModal() }}><img src={add} alt="ajouter" className='add-dash' /></button>
      </div>
      <div className='scrollable-table'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Numéro de téléphone</th>
              <th scope="col">Poste</th>
              <th scope="col">Entreprise</th>
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
            ) : directory.length === 0 ? (
              <tr>
                <td colSpan="6" className='text-center font-italic'>
                  Il n'y a pas encore de contact dans le répertoire Loukoumotiv'.
                </td>
              </tr>
            ) : (
              directory.map((contact) => (
                <tr key={contact._id}>
                  <td scope="row">{contact.fullName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.position}</td>
                  <td>{contact.companyName ? contact.companyName : '-'}</td>
                  <td>
                    <img className='table-action-icon' src={edit} alt="modifier" onClick={() => { toggleEditModal(contact) }} />
                    <img className='table-action-icon' src={remove} alt="supprimer" onClick={() => { toggleDeleteModal(contact._id, contact.fullName) }} />
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <div>
          <Modal isOpen={toggleEditModal} toggle={toggleEditModal}>
            {contactToEdit && (
              < Form className="form-modal">
                <ModalHeader toggle={toggleEditModal}>Mettre à jour le contact</ModalHeader>
                <ModalBody>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="fullName">Nom *</Label>
                        <Input type="text" placeholder={contactToEdit.fullName} onChange={(e) => setFullName(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Email *</Label>
                        <Input type="text" placeholder={contactToEdit.email} onChange={(e) => setEmail(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Numéro de téléphone *</Label>
                        <Input type="text" placeholder={contactToEdit.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="position">Poste / activité *</Label>
                        <Input type="text" placeholder={contactToEdit.position} onChange={(e) => setPosition(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="position">Entreprise (si applicable)</Label>
                        <Input type="text" placeholder={contactToEdit.companyName} onChange={(e) => setCompanyName(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" placeholder={contactToEdit.notes} onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
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
            <ModalHeader toggle={toggleDeleteModal}>Supprimer un contact</ModalHeader>
            <ModalBody>
              {contactToDelete && (
                <p>Êtes-vous sûr de vouloir supprimer '{contactToDelete.fullName}' du répertoire ?</p>
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
              <ModalHeader toggle={toggleAddModal}>Ajouter un contact</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="fullName">Nom *</Label>
                      <Input type="text" onChange={(e) => setFullName(e.target.value)} bsSize="sm" required />
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
                      <Label for="phoneNumber">Numéro de téléphone *</Label>
                      <Input type="text" onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="position">Poste / activité *</Label>
                      <Input type="text" onChange={(e) => setPosition(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="companyName">Entreprise (si applicable)</Label>
                      <Input type="text" onChange={(e) => setCompanyName(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
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
                  Enregistrer
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

export default DirectoryDash;
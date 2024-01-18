import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllContacts, getContactById, addContact, deleteContact, updateContact } from '../redux/actions/directory'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';

function DirectoryDash() {
  const dispatch = useDispatch();
  const directory = useSelector((state) => state.directory);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState({});
  const [contactToDelete, setContactToDelete] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(getAllContacts())
  }, [dispatch])

  setTimeout(() => {
    console.log("directory", directory);
  }, 5000);

  const toggleEditModal = (contact) => {
    setContactToEdit(contact);
    setShowEditModal(!showEditModal)
  }

  const handleEdit = () => {
    if (contactToEdit && contactToEdit._id) {
      dispatch(updateContact(contactToEdit._id, fullName, email, phoneNumber, position, companyName, notes));
      setShowEditModal(false);
    }
  };

  const toggleDeleteModal = (Id, fullName) => {
    setContactToDelete({ Id, fullName });
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = () => {
    if (contactToDelete && contactToDelete.Id) {
      dispatch(deleteContact(contactToDelete.Id));
      setShowDeleteModal(false);
    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleAdd = () => {
    if (!fullName || !email || !phoneNumber || !position) {
      console.error('Les champs * doivent être renseignés');
      setValidationMessage('Les champs * doivent être renseignés');
      return;
    }

    dispatch(addContact(fullName, email, phoneNumber, position, companyName, notes));
    setShowAddModal(false)

    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setPosition('');
    setCompanyName('');
    setNotes('');
  }

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button" onClick={() => { toggleAddModal() }}>Ajouter un contact</button>
      </div>
      <table className="table scrollable-table">
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
          {directory && directory.map((contact) => (
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
          ))}
        </tbody>
      </table>

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
                        <Input type="text" placeholder={contactToEdit.fullName || ''} onChange={(e) => setFullName(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Email *</Label>
                        <Input type="text" placeholder={contactToEdit.email || ''} onChange={(e) => setEmail(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Numéro de téléphone *</Label>
                        <Input type="text" placeholder={contactToEdit.phoneNumber || ''} onChange={(e) => setPhoneNumber(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="position">Poste / activité *</Label>
                        <Input type="text" placeholder={contactToEdit.position || ''} onChange={(e) => setPosition(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="position">Entreprise (si applicable)</Label>
                        <Input type="text" placeholder={contactToEdit.companyName || ''} onChange={(e) => setCompanyName(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" placeholder={contactToEdit.notes || ''} onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
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
                  {validationMessage && (
                  <span className='text-danger font-italic pt-3'>{validationMessage}</span>
                )}
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
                <p>Êtes-vous sûr de vouloir supprimer '{contactToDelete.fullName}' des partenaires ?</p>
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
              <ModalHeader toggle={toggleAddModal}>Ajouter un partenaire</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="fullName">Nom *</Label>
                      <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} bsSize="sm" required />
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

export default DirectoryDash;
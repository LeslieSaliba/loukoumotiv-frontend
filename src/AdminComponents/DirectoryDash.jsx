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
  const [contactToEdit, setcontactToEdit] = useState({});
  const [contactToDelete, setContactToDelete] = useState(null);

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
    setcontactToEdit(contact);
    setShowEditModal(!showEditModal)
  }

  const handleEdit = () => {
    if (contactToEdit && contactToEdit._id) {
      dispatch(updateContact(contactToEdit._id, contactToEdit));
      setShowEditModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setcontactToEdit((prevContact) => ({
      ...prevContact,
      [name]: fieldValue,
    }));
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
    dispatch(addContact());
    setShowAddModal(false)
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
                        <Label for="fullName">Nom</Label>
                        <Input type="text" name="fullName" id="fullName" value={contactToEdit.fullName || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Email</Label>
                        <Input type="text" name="email" id="email" value={contactToEdit.email || ''} onChange={handleChange} placeholder="Email" bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                    <FormGroup>
                        <Label for="place">Numéro de téléphone</Label>
                        <Input type="text" name="phoneNumber" id="phoneNumber" value={contactToEdit.phoneNumber || ''} onChange={handleChange} placeholder="Numéro de téléphone" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="position">Poste</Label>
                        <Input type="text" name="position" id="position" value={contactToEdit.position || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                    <FormGroup>
                        <Label for="place">Numéro de téléphone</Label>
                        <Input type="text" name="phoneNumber" id="phoneNumber" value={contactToEdit.phoneNumber || ''} onChange={handleChange} placeholder="Numéro de téléphone" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="position">Entreprise</Label>
                        <Input type="text" name="companyName" id="companyName" value={contactToEdit.companyName || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" name="notes" id="notes" value={contactToEdit.notes || ''} onChange={handleChange} bsSize="sm" />
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
                      <Label for="fullName">Nom</Label>
                      <Input type="text" name="fullName" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" bsSize="sm" />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                  <FormGroup>
                      <Label for="phoneNumber">Numéro de téléphone</Label>
                      <Input type="text" name="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Numéro de téléphone" bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                  <FormGroup>
                      <Label for="position">Poste</Label>
                      <Input type="text" name="position" id="position" value={position} onChange={(e) => setPosition(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                  <FormGroup>
                      <Label for="companyName">Entreprise</Label>
                      <Input type="text" name="companyName" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Entreprise (si applicable)" bsSize="sm" />
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
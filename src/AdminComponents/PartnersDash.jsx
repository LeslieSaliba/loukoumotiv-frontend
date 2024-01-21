import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllPartners, addPartner, deletePartner, updatePartner } from '../redux/actions/partners'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';
import add from '../assets/icones/ajouter_blanc.png';

function PartnersDash() {
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [partnerToEdit, setPartnerToEdit] = useState({});
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const [name, setName] = useState(partnerToEdit.name || '');
  const [type, setType] = useState(partnerToEdit.type || '');
  const [website, setWebsite] = useState(partnerToEdit.website || '');
  const [location, setLocation] = useState({
    place: partnerToEdit.location.place || '',
    number: partnerToEdit.location.number || '',
    street: partnerToEdit.location.street || '',
    ZIPcode: partnerToEdit.location.ZIPcode || '',
    city: partnerToEdit.location.city || '',
  })
  const [referenceContact, setReferenceContact] = useState({
    name: partnerToEdit.referenceContact.name || '',
    number: partnerToEdit.referenceContact.number || '',
    email: partnerToEdit.referenceContact.email || '',
    position: partnerToEdit.referenceContact.position || '',
  })
  const [notes, setNotes] = useState(partnerToEdit.notes || '');

  useEffect(() => {
    dispatch(getAllPartners())
  }, [dispatch])

  setTimeout(() => {
    console.log("partners", partners);
  }, 5000);

  const toggleEditModal = (partner) => {
    setPartnerToEdit(partner);
    setShowEditModal(!showEditModal)
  }

  const handleEdit = () => {
    if (partnerToEdit && partnerToEdit._id) {
      dispatch(updatePartner(partnerToEdit._id, name, type, location, website, referenceContact, notes));
      setShowEditModal(false);
    }
  };

  const toggleDeleteModal = (Id, name) => {
    setPartnerToDelete({ Id, name });
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = () => {
    if (partnerToDelete && partnerToDelete.Id) {
      dispatch(deletePartner(partnerToDelete.Id));
      setShowDeleteModal(false);
    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleAdd = () => {
    if (!name || !type || !location || !website || !referenceContact) {
      console.error('Les champs * doivent être renseignés');
      setValidationMessage('Les champs * doivent être renseignés');
      return;
    }

    dispatch(addPartner(name, type, location, website, referenceContact, notes));
    setShowAddModal(false)

    setName('');
    setType('');
    setWebsite('');
    setLocation('')
    setReferenceContact('');
    setNotes('');
  }

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button d-none d-md-block" onClick={() => { toggleAddModal() }}>Ajouter un partenaire</button>
        <button className='action-button add-button d-block d-md-none' onClick={() => { toggleAddModal() }}><img src={add} alt="ajouter" className='add-dash' /></button>
      </div>
      <div className='scrollable-table'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Type</th>
              <th scope="col">Localisation</th>
              <th scope="col">Contact</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.length === 0 ? (
              <tr>
                <td colSpan="9" className='text-center font-italic'>Vous n'avez pas encore ajouté de partenaires Loukoumotiv'.</td>
              </tr>
            ) : (partners && partners.map((partner) => (
              <tr key={partner._id}>
                <td scope="row">{partner.name}</td>
                <td>{partner.type}</td>
                <td>{partner.location ? (partner.location.city + ' ' + partner.location.ZIPcode) : '-'}</td>
                <td>{partner.referenceContact ? (partner.referenceContact.name + ',' + partner.referenceContact.position) : '-'}</td>
                <td>
                  <img className='table-action-icon' src={edit} alt="modifier" onClick={() => { toggleEditModal(partner) }} />
                  <img className='table-action-icon' src={remove} alt="supprimer" onClick={() => { toggleDeleteModal(partner._id, partner.name) }} />
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <div>
          <Modal isOpen={toggleEditModal} toggle={toggleEditModal}>
            {partnerToEdit && (
              < Form className="form-modal">
                <ModalHeader toggle={toggleEditModal}>Mettre à jour le partenaire</ModalHeader>
                <ModalBody>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="fullName">Nom *</Label>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type *</Label>
                        <Input type="select" value={type} onChange={(e) => setType(e.target.value)} bsSize="sm" required >
                          <option value=""></option>
                          <option value="event">Event</option>
                          <option value="corporate">Corporate</option>
                          <option value="social">Social</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Précision sur le lieu *</Label>
                        <Input type="text" value={location?.place} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, place: e.target.value }))} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="website">Site internet *</Label>
                        <Input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="address">Adresse</Label>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="address">N° *</Label>
                            <Input type="text" value={location?.number} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, number: e.target.value }))} bsSize="sm" required />
                          </div>
                          <div className="col-md-6">
                            <Label for="address">Rue *</Label>
                            <Input type="text" value={location?.street} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, street: e.target.value }))} bsSize="sm" required />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="address">Code postal *</Label>
                            <Input type="text" value={location?.ZIPcode} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, ZIPcode: e.target.value }))} bsSize="sm" required />
                          </div>
                          <div className="col-md-6">
                            <Label for="address">Ville *</Label>
                            <Input type="text" value={location?.city} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, city: e.target.value }))} bsSize="sm" required />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="address">Contact de référence</Label>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="name">Nom *</Label>
                            <Input type="text" value={referenceContact?.name} onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, name: e.target.value }))} bsSize="sm" required />
                          </div>
                          <div className="col-md-6">
                            <Label for="number">Numéro de téléphone *</Label>
                            <Input type="text" value={referenceContact?.number} onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, number: e.target.value }))} bsSize="sm" required />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="email">Email *</Label>
                            <Input type="text" value={referenceContact?.email} onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, email: e.target.value }))} bsSize="sm" required />
                          </div>
                          <div className="col-md-6">
                            <Label for="position">Poste *</Label>
                            <Input type="text" value={referenceContact?.position} onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, position: e.target.value }))} bsSize="sm" required />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
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
            <ModalHeader toggle={toggleDeleteModal}>Supprimer un partenaire</ModalHeader>
            <ModalBody>
              {partnerToDelete && (
                <p>Êtes-vous sûr de vouloir supprimer '{partnerToDelete.name}' des partenaires ?</p>
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
                      <Input type="text" onChange={(e) => setName(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="type">Type *</Label>
                      <Input type="select" onChange={(e) => setType(e.target.value)} bsSize="sm">
                        <option value=""></option>
                        <option value="event">Event</option>
                        <option value="corporate">Corporate</option>
                        <option value="social">Social</option>
                      </Input>
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="place">Précision sur le lieu *</Label>
                      <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, place: e.target.value }))} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="website">Site internet *</Label>
                      <Input type="text" onChange={(e) => setWebsite(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="address">Adresse</Label>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="fullAddress">N° *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, number: e.target.value }))} bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Label for="fullAddress">Rue *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, street: e.target.value }))} bsSize="sm" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="fullAddress">Code postal *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, ZIPcode: e.target.value }))} bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Label for="fullAddress">Ville *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, city: e.target.value }))} bsSize="sm" />
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="address">Contact de référence</Label>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="referenceContact">Nom complet *</Label>
                          <Input type="text" onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, name: e.target.value }))} bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Label for="referenceContact">Numéro de téléphone *</Label>
                          <Input type="text" onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, number: e.target.value }))} bsSize="sm" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="referenceContact">Email *</Label>
                          <Input type="text" onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, email: e.target.value }))} bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Label for="referenceContact">Poste *</Label>
                          <Input type="text" onChange={(e) => setReferenceContact((prevReferenceContact) => ({ ...prevReferenceContact, position: e.target.value }))} bsSize="sm" />
                        </div>
                      </div>
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

export default PartnersDash;
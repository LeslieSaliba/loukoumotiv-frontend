import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllPartners, getPartnerById, addPartner, getPartnerByType, deletePartner, updatePartner } from '../redux/actions/partners'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';

function PartnersDash() {
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [partnerToEdit, setPartnerToEdit] = useState({});
  const [partnerToDelete, setPartnerToDelete] = useState(null);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [website, setWebsite] = useState('');
  const [place, setPlace] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [street, setStreet] = useState('');
  const [ZIPcode, setZIPcode] = useState('');
  const [city, setCity] = useState('');
  const [contactName, setContactName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [notes, setNotes] = useState('');

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
      dispatch(updatePartner(partnerToEdit._id, partnerToEdit));
      setShowEditModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setPartnerToEdit((prevPartner) => ({
      ...prevPartner,
      [name]: fieldValue,
    }));
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
    dispatch(addPartner());
    setShowAddModal(false)
  }

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button" onClick={() => { toggleAddModal() }}>Ajouter un partenaire</button>
      </div>
      <table className="table scrollable-table">
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
          {partners && partners.map((partner) => (
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
          ))}
        </tbody>
      </table>

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
                        <Label for="fullName">Nom</Label>
                        <Input type="text" name="name" id="name" value={partnerToEdit.name || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" name="type" id="type" value={partnerToEdit.type || ''} onChange={handleChange} bsSize="sm">
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
                        <Label for="place">Précision sur le lieu</Label>
                        <Input type="text" name="location.place" id="locationPlace" value={partnerToEdit.location?.place || ''} onChange={handleChange} placeholder="Précision sur le lieu" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="website">Site internet</Label>
                        <Input type="text" name="website" id="website" value={partnerToEdit.website || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="address">Adresse</Label>
                        <div className="row">
                          <div className="col-md-6">
                            <Input type="text" name="location.number" id="locationNumber" value={partnerToEdit.location?.number || ''} onChange={handleChange} placeholder="N° de rue" bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Input type="text" name="location.street" id="locationStreet" value={partnerToEdit.location?.street || ''} onChange={handleChange} placeholder="Rue" bsSize="sm" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Input type="text" name="location.ZIPcode" id="locationZIPcode" value={partnerToEdit.location?.ZIPcode || ''} onChange={handleChange} placeholder="Code postal" bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Input type="text" name="location.city" id="locationCity" value={partnerToEdit.location?.city || ''} onChange={handleChange} placeholder="Ville" bsSize="sm" />
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
                            <Input type="text" name="referenceContact.name" id="referenceContactName" value={partnerToEdit.referenceContact?.name || ''} onChange={handleChange} placeholder="Nom" bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Input type="text" name="referenceContact.number" id="referenceContactNumber" value={partnerToEdit.referenceContact?.number || ''} onChange={handleChange} placeholder="Numéro" bsSize="sm" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Input type="text" name="referenceContact.email" id="referenceContactEmail" value={partnerToEdit.referenceContact?.email || ''} onChange={handleChange} placeholder="Email" bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Input type="text" name="referenceContact.position" id="referenceContactPosition" value={partnerToEdit.referenceContact?.position || ''} onChange={handleChange} placeholder="Poste" bsSize="sm" />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" name="notes" id="notes" value={partnerToEdit.notes || ''} onChange={handleChange} bsSize="sm" />
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
                      <Label for="fullName">Nom</Label>
                      <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="type">Type</Label>
                      <Input type="select" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} bsSize="sm">
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
                      <Label for="place">Précision sur le lieu</Label>
                      <Input type="text" name="location.place" id="locationPlace" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Précision sur le lieu" bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                  <FormGroup>
                      <Label for="website">Site internet</Label>
                      <Input type="text" name="website" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="address">Adresse</Label>
                      <div className="row">
                        <div className="col-md-6">
                          <Input type="text" name="location.number" id="locationNumber" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} placeholder="N° de rue" bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Input type="text" name="location.street" id="locationStreet" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Rue" bsSize="sm" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Input type="text" name="location.ZIPcode" id="locationZIPcode" value={ZIPcode} onChange={(e) => setZIPcode(e.target.value)} placeholder="Code postal" bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Input type="text" name="location.city" id="locationCity" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ville" bsSize="sm" />
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
                          <Input type="text" name="referenceContact.name" id="referenceContactName" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Nom" bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Input type="text" name="referenceContact.number" id="referenceContactNumber" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Numéro" bsSize="sm" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Input type="text" name="referenceContact.email" id="referenceContactEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" bsSize="sm" />
                        </div>
                        <div className="col-md-6">
                          <Input type="text" name="referenceContact.position" id="referenceContactPosition" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Poste" bsSize="sm" />
                        </div>
                      </div>
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

export default PartnersDash;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllMissions, getMissionById, addMission, getMissionByType, deleteMission, updateMission, getMissionsByStatus, getMissionsByPartnerBillingStatus, getMissionsByTeamBillingStatus, registerToMission, dropMission } from '../redux/actions/missions';
import { getMemberById } from '../redux/actions/team';
import { getPartnerById } from '../redux/actions/partners';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';

function MissionsDash() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [missionToEdit, setMissionToEdit] = useState({});
  const [missionToDelete, setMissionToDelete] = useState(null);
  const [partnerNames, setPartnerNames] = useState({});
  const [registeredMembersNames, setRegisteredMembersNames] = useState({});

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [dates, setDates] = useState({});
  const [hours, setHours] = useState({});
  const [place, setPlace] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [street, setStreet] = useState('');
  const [ZIPcode, setZIPcode] = useState('');
  const [city, setCity] = useState('');
  const [partner, setPartner] = useState('');
  const [capacity, setCapacity] = useState('');
  const [requiredMembers, setRequiredMembers] = useState('');
  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [remuneration, setRemuneration] = useState('');
  const [status, setStatus] = useState('');
  const [teamBilling, setTeamBilling] = useState('');
  const [partnerBilling, setPartnerBilling] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(getAllMissions())
  }, [dispatch])

  setTimeout(() => {
    console.log("missions", missions);
  }, 5000);

  const toggleEditModal = (mission) => {
    setMissionToEdit(mission);
    setShowEditModal(!showEditModal)
  }

  const handleEdit = () => {
    if (missionToEdit && missionToEdit._id) {
      dispatch(updateMission(missionToEdit._id, missionToEdit));
      setShowEditModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setMissionToEdit((prevMission) => ({
      ...prevMission,
      [name]: fieldValue,
    }));
  };

  const toggleDeleteModal = (Id, title) => {
    setMissionToDelete({ Id, title });
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = () => {
    if (missionToDelete && missionToDelete.Id) {
      dispatch(deleteMission(missionToDelete.Id));
      setShowDeleteModal(false);
    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleAdd = () => {
    dispatch(addMission());
    setShowAddModal(false)
  }

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button" onClick={() => { toggleAddModal() }}>Ajouter une mission</button>
      </div>
      <table className="table scrollable-table">
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Partenaire</th>
            <th scope="col">Type</th>
            <th scope="col">Date(s)</th>
            <th scope="col">Heures</th>
            <th scope="col">Masseurs requis</th>
            <th scope="col">Masseurs inscrits</th>
            <th scope="col">Rémunération</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {missions &&
            missions.map((mission) => (
              <tr key={mission._id}>
                <td scope="row">{mission.title}</td>
                <td>{mission.partner}</td>
                <td>{mission.type}</td>
                <td>{new Date(mission.time.date).toLocaleDateString("en-GB")}</td>
                <td>{mission.time.hours}</td>
                <td>{mission.requiredMembers}</td>
                <td>{mission.registeredMembers}</td>
                <td>{mission.remuneration}</td>
                <td>
                  <img className="table-action-icon" src={edit} alt="modifier" onClick={() => toggleEditModal(mission)} />
                  <img
                    className="table-action-icon"
                    src={remove}
                    alt="supprimer"
                    onClick={() => toggleDeleteModal(mission._id, mission.title)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showEditModal && (
        <div>
          <Modal isOpen={toggleEditModal} toggle={toggleEditModal}>
            {missionToEdit && (
              < Form className="form-modal">
                <ModalHeader toggle={toggleEditModal}>Mettre à jour la mission</ModalHeader>
                <ModalBody>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="title">Titre</Label>
                        <Input type="text" name="title" id="title" value={missionToEdit.title || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" name="type" id="type" value={missionToEdit.type || ''} onChange={handleChange} bsSize="sm">
                          <option value="event">Événementiel</option>
                          <option value="corporate">En entreprise</option>
                          <option value="social">Social</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="partner">Partenaire</Label>
                        <Input type="email" name="partner" id="partner" value={missionToEdit.partner || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Précision sur le lieu</Label>
                        <Input type="email" name="place" id="place" value={missionToEdit.place || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="date">Date</Label>
                        <Input type="date" name="date" id="date" value={missionToEdit.date || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="hours">Hours</Label>
                        <Input type="text" name="hours" id="hours" value={missionToEdit.hours || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={missionToEdit.description || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="remuneration">Rémunération</Label>
                        <Input type="text" name="remuneration" id="remuneration" value={missionToEdit.remuneration || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="fullAddress">Adresse</Label>
                        <div className="row">
                          <div className="col-md-6">
                            <Input type="text" name="location.number" id="locationNumber" value={missionToEdit.location?.number || ''} onChange={handleChange} placeholder="N° de rue" bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Input type="text" name="location.street" id="locationStreet" value={missionToEdit.location?.street || ''} onChange={handleChange} placeholder="Rue" bsSize="sm" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Input type="text" name="location.ZIPcode" id="locationZIPcode" value={missionToEdit.location?.ZIPcode || ''} onChange={handleChange} placeholder="Code postal" bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Input type="text" name="location.city" id="locationCity" value={missionToEdit.location?.city || ''} onChange={handleChange} placeholder="Ville" bsSize="sm" />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="requiredMembers">Masseurs requis</Label>
                        <Input type="number" name="requiredMembers" id="requiredMembers" value={missionToEdit.requiredMembers || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="capacity">Jauge</Label>
                        <Input type="text" name="capacity" id="capacity" value={missionToEdit.capacity || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="registeredMembers">Masseurs inscrits</Label>
                        <Input type="text" name="registeredMembers" id="registeredMembers" value={missionToEdit.registeredMembers || ''} onChange={handleChange} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="status">Statut</Label>
                        <Input type="select" name="status" id="status" value={missionToEdit.status || ''} onChange={handleChange} bsSize="sm">
                          <option value="to do">À venir</option>
                          <option value="done">Fait</option>
                          <option value="cancelled">Annulée</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                    <FormGroup>
                        <Label for="teamBilling">Statut</Label>
                        <Input type="select" name="teamBilling" id="teamBilling" value={missionToEdit.teamBilling || ''} onChange={handleChange} bsSize="sm">
                          <option value="to do">À faire</option>
                          <option value="in progress">En cours</option>
                          <option value="done">Fait</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                    <FormGroup>
                            <Label for="partnerBilling">Statut</Label>
                            <Input type="select" name="partnerBilling" id="partnerBilling" value={missionToEdit.partnerBilling || ''} onChange={handleChange} bsSize="sm">
                              <option value="to do">À faire</option>
                              <option value="in progress">En cours</option>
                              <option value="done">Fait</option>
                            </Input>
                          </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" name="notes" id="notes" value={missionToEdit.notes || ''} onChange={handleChange} bsSize="sm" />
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
              <ModalHeader toggle={toggleDeleteModal}>Supprimer une mission</ModalHeader>
              <ModalBody>
                {missionToDelete && (
                  <p>Êtes-vous sûr de vouloir supprimer '{missionToDelete.title}' des missions ?</p>
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
              <ModalHeader toggle={toggleAddModal}>Ajouter une nouvelle mission</ModalHeader>
              <ModalBody>
              <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="title">Titre</Label>
                        <Input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Rue" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" bsSize="sm">
                          <option value="event">Événementiel</option>
                          <option value="corporate">En entreprise</option>
                          <option value="social">Social</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="partner">Partenaire</Label>
                        <Input type="email" name="partner" id="partner" value={partner} onChange={(e) => setPartner(e.target.value)} placeholder="Partenaire" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Précision sur le lieu</Label>
                        <Input type="email" name="place" id="place" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Précision sur le lieu" bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="date">Date</Label>
                        <Input type="date" name="date" id="date" value={dates} onChange={(e) => setDates(e.target.value)} placeholder="Date(s)" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="hours">Horaires</Label>
                        <Input type="text" name="hours" id="hours" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Horaires" bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="remuneration">Rémunération</Label>
                        <Input type="text" name="remuneration" id="remuneration" value={remuneration} onChange={(e) => setRemuneration(e.target.value)} placeholder="Rémunération" bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="fullAddress">Adresse</Label>
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
                            <Input type="text" name="location.city" id="locationCity" value={city} onChange={(e) => setCity(e.target.value)}  placeholder="Ville" bsSize="sm" />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="requiredMembers">Masseurs requis</Label>
                        <Input type="number" name="requiredMembers" id="requiredMembers" value={requiredMembers} onChange={(e) => setRequiredMembers(e.target.value)} placeholder="Masseurs requis" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="capacity">Jauge</Label>
                        <Input type="text" name="capacity" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Jauge" bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="registeredMembers">Masseurs inscrits</Label>
                        <Input type="text" name="registeredMembers" id="registeredMembers" value={registeredMembers} onChange={(e) => setRegisteredMembers(e.target.value)} placeholder="Membres inscrits" bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="status">Statut</Label>
                        <Input type="select" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Statut" bsSize="sm">
                          <option value="to do">À venir</option>
                          <option value="done">Fait</option>
                          <option value="cancelled">Annulée</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                    <FormGroup>
                        <Label for="teamBilling">Facturation équipe</Label>
                        <Input type="select" name="teamBilling" id="teamBilling" value={teamBilling} onChange={(e) => setTeamBilling(e.target.value)} placeholder="Facturation équipe" bsSize="sm">
                          <option value="to do">À faire</option>
                          <option value="in progress">En cours</option>
                          <option value="done">Fait</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                    <FormGroup>
                            <Label for="partnerBilling">Facturation partenaire</Label>
                            <Input type="select" name="partnerBilling" id="partnerBilling" value={partnerBilling} onChange={(e) => setPartnerBilling(e.target.value)} placeholder="Facturation partenaire" bsSize="sm">
                              <option value="to do">À faire</option>
                              <option value="in progress">En cours</option>
                              <option value="done">Fait</option>
                            </Input>
                          </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" name="notes" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" bsSize="sm" />
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

export default MissionsDash;
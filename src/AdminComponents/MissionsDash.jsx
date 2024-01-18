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
  const [registeredMembersNames, setRegisteredMembersNames] = useState({});
  const [validationMessage, setValidationMessage] = useState('');

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState({
    date: null,
    hours: [],
  })
  const [location, setLocation] = useState({
    place: null,
    number: null,
    street: null,
    ZIPcode: null,
    city: null,
  })
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
    if (!title || !description || !partner || !location || !type || !time || !capacity || !requiredMembers || !remuneration) {
      console.error('Tous les champs doivent être renseignés');
      setValidationMessage('Tous les champs doivent être renseignés');
      return;
    }

    dispatch(addMission(title, description, partner, location, type, time, capacity, requiredMembers, registeredMembers, remuneration, status, teamBilling, partnerBilling, notes));
    setShowAddModal(false)

    setTitle('');
    setType('');
    setDescription('');
    setTime({ date: null, hours: [] });
    setLocation({ place: null, number: null, street: null, ZIPcode: null, city: null });
    setPartner('');
    setCapacity('');
    setRequiredMembers('');
    setRegisteredMembers([]);
    setRemuneration('');
    setStatus('');
    setTeamBilling('');
    setPartnerBilling('');
    setNotes('');
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
                <td>{mission.partner.name}</td>
                <td>{mission.type}</td>
                <td>{new Date(mission.time.date).toLocaleDateString("en-GB")}</td>
                <td>{mission.time.hours}</td>
                <td>{mission.requiredMembers}</td>
                <td>{mission.registeredMembers.fullName}</td>
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
                        <Input type="text" placeholder={missionToEdit.title || ''} onChange={(e) => setTitle(e.target.value)}  bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" placeholder={missionToEdit.type || ''} onChange={(e) => setType(e.target.value)} bsSize="sm">
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
                        <Input type="email" placeholder={missionToEdit.partner || ''} onChange={(e) => setPartner(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Précision sur le lieu</Label>
                        <Input type="email" placeholder={missionToEdit.place || ''} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, place: e.target.value }))} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="date">Date</Label>
                        <Input type="date" placeholder={missionToEdit.date || ''} onChange={(e) => setTime((prevTime) => ({ ...prevTime, date: e.target.value }))}  bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="hours">Hours</Label>
                        <Input type="text" placeholder={missionToEdit.hours || ''} onChange={(e) => setTime((prevTime) => ({ ...prevTime, hours: e.target.value }))} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" placeholder={missionToEdit.description || ''} onChange={(e) => setDescription(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="remuneration">Rémunération</Label>
                        <Input type="text" placeholder={missionToEdit.remuneration || ''} onChange={(e) => setRemuneration(e.target.value)} bsSize="sm" />
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
                            <Input type="text" placeholder={missionToEdit.location?.number || ''} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, number: e.target.value }))} bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Rue</Label>
                            <Input type="text" placeholder={missionToEdit.location?.street || ''} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, street: e.target.value }))}  bsSize="sm" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="fullAddress">Code postal</Label>
                            <Input type="text" placeholder={missionToEdit.location?.ZIPcode || ''} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, ZIPcode: e.target.value }))} bsSize="sm" />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Ville</Label>
                            <Input type="text" placeholder={missionToEdit.location?.city || ''} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, city: e.target.value }))} bsSize="sm" />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="requiredMembers">Masseurs requis</Label>
                        <Input type="number" placeholder={missionToEdit.requiredMembers || ''} onChange={(e) => setRequiredMembers(e.target.value)}  bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="capacity">Jauge</Label>
                        <Input type="text" placeholder={missionToEdit.capacity || ''} onChange={(e) => setCapacity(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="registeredMembers">Masseurs inscrits</Label>
                        <Input type="text" placeholder={missionToEdit.registeredMembers || ''} onChange={(e) => setRegisteredMembers(e.target.value)} bsSize="sm" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="status">Statut</Label>
                        <Input type="select" placeholder={missionToEdit.status || ''} onChange={(e) => setStatus(e.target.value)}  bsSize="sm">
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
                        <Input type="select" placeholder={missionToEdit.teamBilling || ''} onChange={(e) => setTeamBilling(e.target.value)} bsSize="sm">
                          <option value="to do">À faire</option>
                          <option value="in progress">En cours</option>
                          <option value="done">Fait</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="partnerBilling">Statut</Label>
                        <Input type="select" placeholder={missionToEdit.partnerBilling || ''} onChange={(e) => setPartnerBilling(e.target.value)} bsSize="sm">
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
                        <Input type="textarea" placeholder={missionToEdit.notes || ''} onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
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
                      <Input type="text" onChange={(e) => setTitle(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="type">Type</Label>
                      <Input type="select" onChange={(e) => setType(e.target.value)} bsSize="sm" required >
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
                      <Input type="text" onChange={(e) => setPartner(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="place">Précision sur le lieu</Label>
                      <Input type="email" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, place: e.target.value }))} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="date">Date</Label>
                      <Input type="date" onChange={(e) => setTime((prevTime) => ({ ...prevTime, date: e.target.value }))} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="hours">Horaires</Label>
                      <Input type="text" onChange={(e) => setTime((prevTime) => ({ ...prevTime, hours: e.target.value }))} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input type="text" onChange={(e) => setDescription(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="remuneration">Rémunération</Label>
                      <Input type="text" onChange={(e) => setRemuneration(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="fullAddress">Adresse</Label>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="siret">N°</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, number: e.target.value }))} bsSize="sm" required />
                        </div>
                        <div className="col-md-6">
                          <Label for="siret">Rue</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, street: e.target.value }))} bsSize="sm" required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="siret">Code postal</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, ZIPcode: e.target.value }))} bsSize="sm" required />
                        </div>
                        <div className="col-md-6">
                          <Label for="siret">Ville</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, city: e.target.value }))} bsSize="sm" required />
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="requiredMembers">Masseurs requis</Label>
                      <Input type="number" onChange={(e) => setRequiredMembers(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="capacity">Jauge</Label>
                      <Input type="text" onChange={(e) => setCapacity(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="registeredMembers">Masseurs inscrits</Label>
                      <Input type="text" onChange={(e) => setRegisteredMembers(e.target.value)} bsSize="sm" />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="status">Statut</Label>
                      <Input type="select" onChange={(e) => setStatus(e.target.value)} bsSize="sm">
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
                      <Input type="select" onChange={(e) => setTeamBilling(e.target.value)} bsSize="sm">
                        <option value="to do">À faire</option>
                        <option value="in progress">En cours</option>
                        <option value="done">Fait</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="partnerBilling">Facturation partenaire</Label>
                      <Input type="select" onChange={(e) => setPartnerBilling(e.target.value)} bsSize="sm">
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

export default MissionsDash;
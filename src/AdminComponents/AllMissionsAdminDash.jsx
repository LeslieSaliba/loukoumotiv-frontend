import React, { useState, useEffect } from 'react';
import Loading from '../Frequents/Loading';
import { formatDate } from '../Frequents/formatDate';
import { getUserID } from '../userInfo/getTeamData';
import { useSelector, useDispatch } from "react-redux";
import { getAllMissions, addMission, deleteMission, updateMission, registerToMission, dropMission } from '../redux/actions/missions';
import { getAllPartners } from '../redux/actions/partners';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import remove from '../assets/icones/supprimer_noir.png';
import edit from '../assets/icones/modifier_noir.png';
import add from '../assets/icones/ajouter_blanc.png';
import registered from '../assets/icones/inscrit_noir.png';
import not_registered from '../assets/icones/desinscrit_noir.png';

function AllMissionsAdminDash() {
  const LoggedMemberId = getUserID();
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners);
  const missions = useSelector((state) => state.missions);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDropModal, setShowDropModal] = useState(false);
  const [showAutoDropModal, setShowAutoDropModal] = useState(false);
  const [missionToEdit, setMissionToEdit] = useState({});
  const [missionToDelete, setMissionToDelete] = useState(null);
  const [missionToRegisterTo, setMissionToRegisterTo] = useState(null);
  const [missionToDrop, setMissionToDrop] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const [title, setTitle] = useState(missionToEdit.title || '');
  const [type, setType] = useState(missionToEdit.type || '');
  const [description, setDescription] = useState(missionToEdit.description || '');
  const [time, setTime] = useState({
    date: missionToEdit.time?.date || '',
    hours: [missionToEdit.time?.hours || ''],
  })
  const [location, setLocation] = useState({
    place: missionToEdit.location?.place || '',
    number: missionToEdit.location?.number || '',
    street: missionToEdit.location?.street || '',
    ZIPcode: missionToEdit.location?.ZIPcode || '',
    city: missionToEdit.location?.city || '',
  })
  const [partner, setPartner] = useState(missionToEdit.partner?.name || '');
  const [capacity, setCapacity] = useState(missionToEdit.capacity || '');
  const [requiredMembers, setRequiredMembers] = useState(missionToEdit.requiredMembers || '');
  const [registeredMembers, setRegisteredMembers] = useState([missionToEdit.registeredmembers?.fullName || '']);
  const [remuneration, setRemuneration] = useState(missionToEdit.remuneration || '');
  const [status, setStatus] = useState(missionToEdit.status || '');
  const [teamBilling, setTeamBilling] = useState(missionToEdit.teamBilling || '');
  const [partnerBilling, setPartnerBilling] = useState(missionToEdit.partnerBilling || '');
  const [notes, setNotes] = useState(missionToEdit.notes || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllMissions());
        dispatch(getAllPartners());
        setLoading(false);
      } catch (error) {
        console.error('Erreur', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch])

  const partnerIds = partners.map(partner => partner._id);
  // console.log("partners: ", partnerIds);

  // setTimeout(() => {
  //   console.log("missions", missions);
  // }, 5000);

  const toggleEditModal = (mission) => {
    setMissionToEdit(mission);
    setShowEditModal(!showEditModal)
  }

  const handleEdit = () => {
    if (missionToEdit && missionToEdit._id) {
      const updatedTitle = title !== '' ? title : missionToEdit.title;
      const updatedDescription = description !== '' ? description : missionToEdit.description;
      const updatedPartner = partner !== '' ? partner : missionToEdit.partner;
      const updatedLocation = {
        place: location.place !== '' ? location.place : missionToEdit.location?.place || '',
        number: location.number !== '' ? location.number : missionToEdit.location?.number || '',
        street: location.street !== '' ? location.street : missionToEdit.location?.street || '',
        ZIPcode: location.ZIPcode !== '' ? location.ZIPcode : missionToEdit.location?.ZIPcode || '',
        city: location.city !== '' ? location.city : missionToEdit.location?.city || '',
      };
      const updatedType = type !== '' ? type : missionToEdit.type;
      const updatedTime = {
        date: time.date !== '' ? time.date : missionToEdit.time?.date || '',
        hours: time.hours !== '' ? time.hours : missionToEdit.time?.hours || [],
      };
      const updatedCapacity = capacity !== '' ? capacity : missionToEdit.capacity;
      const updatedRequiredMembers = requiredMembers !== '' ? requiredMembers : missionToEdit.requiredMembers;
      // const updatedRegisteredMembers = registeredMembers !== '' ? registeredMembers : missionToEdit.registeredMembers;
      const updatedRemuneration = remuneration !== '' ? remuneration : missionToEdit.remuneration;
      const updatedStatus = status !== '' ? status : missionToEdit.status;
      const updatedTeamBilling = teamBilling !== '' ? teamBilling : missionToEdit.teamBilling;
      const updatedPartnerBilling = partnerBilling !== '' ? partnerBilling : missionToEdit.partnerBilling;
      const updatedNotes = notes !== '' ? notes : missionToEdit.notes;

      dispatch(updateMission(missionToEdit._id, updatedTitle, updatedDescription, updatedPartner, updatedLocation, updatedType, updatedTime, updatedCapacity, updatedRequiredMembers, updatedRemuneration, updatedStatus, updatedTeamBilling, updatedPartnerBilling, updatedNotes));
      window.location.reload()
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
      window.location.reload()
    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleAdd = () => {
    if (!title || !description || !partner || !location || !type || !time || !capacity || !requiredMembers || !remuneration) {
      console.error('Les champs * doivent être renseignés');
      setValidationMessage('Les champs * doivent être renseignés');
      return;
    }
    const registeredMembers = [];
    dispatch(addMission(title, description, partner, location, type, time, capacity, requiredMembers, registeredMembers, remuneration, status, teamBilling, partnerBilling, notes));
    setShowAddModal(false)
    window.location.reload()
    // setTitle('');
    // setType('');
    // setDescription('');
    // setTime({ date: null, hours: [] });
    // setLocation({ place: null, number: null, street: null, ZIPcode: null, city: null });
    // setPartner('');
    // setCapacity('');
    // setRequiredMembers('');
    // setRegisteredMembers([]);
    // setRemuneration('');
    // setStatus('');
    // setTeamBilling('');
    // setPartnerBilling('');
    // setNotes('');
  }

  const toggleRegisterModal = (Id, title) => {
    setMissionToRegisterTo({ Id, title });
    setShowRegisterModal(!showRegisterModal)
  }

  const handleRegister = (e) => {
    if (missionToRegisterTo && missionToRegisterTo.Id) {
      dispatch(registerToMission(missionToRegisterTo.Id, LoggedMemberId));
      setShowRegisterModal(false);
      window.location.reload()
    }
  };

  const toggleDropModal = (Id, title, registeredMember) => {
    setMissionToDrop({ Id, title, registeredMember });
    setShowDropModal(!showDropModal)
  }

  const handleDrop = () => {
    if (missionToDrop && missionToDrop.Id && missionToDrop.registeredMember) {
      const { Id, registeredMember } = missionToDrop;
      const { _id: teamMemberId } = registeredMember;
      dispatch(dropMission(Id, teamMemberId));
      setShowDropModal(false);
      window.location.reload()
    }
  }

  const toggleAutoDropModal = (Id, title) => {
    setMissionToDrop({ Id, title });
    setShowAutoDropModal(!showAutoDropModal)
  }

  const handleAutoDrop = () => {
    if (missionToDrop && missionToDrop.Id && LoggedMemberId) {
      dispatch(dropMission(missionToDrop.Id, LoggedMemberId));
      setShowAutoDropModal(false);
      window.location.reload()
    }
  }

  // console.log("mission to edit: ", missionToEdit);

  return (
    <div className="container ">
      <div className='d-flex justify-content-end'>
        <button className="action-button add-button d-none d-md-block" onClick={() => { toggleAddModal() }}>Ajouter une mission</button>
        <button className='action-button add-button d-block d-md-none' onClick={() => { toggleAddModal() }}><img src={add} alt="ajouter" className='add-dash' /></button>
      </div>
      <div className='scrollable-table'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Titre</th>
              <th scope="col">Statut &#8597;</th>
              <th scope="col">Partenaire</th>
              <th scope="col">Type</th>
              <th scope="col">Date(s)</th>
              <th scope="col">Heures</th>
              <th scope="col">Requis</th>
              <th scope="col">Inscrits</th>
              <th scope="col">Rémunération</th>
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
            ) : missions.length === 0 ? (
              <tr>
                <td colSpan="9" className='text-center font-italic'>Vous n'avez pas encore ajouté de missions Loukoumotiv'.</td>
              </tr>
            ) : (missions &&
              missions.map((mission) => (
                <tr key={mission._id}>
                  <td scope="row">{mission.title}</td>
                  <td>{(() => {
                    switch (mission.status) {
                      case 'to do':
                        return 'À venir';
                      case 'done':
                        return 'Fait';
                      case 'cancelled':
                        return 'Annulée';
                      default:
                        return mission.status;
                    }
                  })()}</td>
                  <td>{mission.partner?.name}</td>
                  <td>{mission.type}</td>
                  {console.log(new Date(mission.time?.date).toLocaleDateString("en-GB"))}
                  <td>{new Date(mission.time?.date).toLocaleDateString("en-GB")}</td>
                  <td>
                    {mission.time?.hours.map((hour, index) => (
                      <div key={index}>{hour}</div>
                    ))}
                  </td>
                  <td>{mission.requiredMembers}</td>
                  {mission.registeredMembers?.length > 0 ? (
                    mission.registeredMembers?.map((member, index) => (
                      <div key={index}>
                        <img className="table-action-icon drop-mission-member" src={remove} alt="inscrit" onClick={() => toggleDropModal(mission._id, mission.title, member)} />
                        {member.fullName}
                      </div>
                    ))
                  ) : (
                    <div>-</div>
                  )}
                  <td>{mission.remuneration}</td>
                  <td>
                    {mission.registeredMembers && mission.registeredMembers.some(member => member._id === LoggedMemberId) ? (
                      <img className="table-action-icon" src={registered} alt="inscrit" onClick={() => toggleAutoDropModal(mission._id, mission.title)} />
                    ) : (
                      <img className="table-action-icon" src={not_registered} alt="non inscrit" onClick={() => toggleRegisterModal(mission._id, mission.title)} />
                    )}
                    <img className="table-action-icon" src={edit} alt="modifier" onClick={() => toggleEditModal(mission)} />
                    <img
                      className="table-action-icon"
                      src={remove}
                      alt="supprimer"
                      onClick={() => toggleDeleteModal(mission._id, mission.title)}
                    />
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>

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
                        <Label for="title">Titre *</Label>
                        <Input type="text" placeholder={missionToEdit.title} onChange={(e) => setTitle(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="status">Statut</Label>
                        <Input type="select" defaultValue={missionToEdit.status} onChange={(e) => setStatus(e.target.value)} bsSize="sm">
                          <option value=""></option>
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
                        <Label for="partner">Partenaire *</Label>
                        <Input type="select" defaultValue={missionToEdit.partner._id} onChange={(e) => setPartner(e.target.value)} bsSize="sm" required >
                          <option value=""></option>
                          {partners && partners.map((partner, index) => (
                            <option key={index} value={partner._id}>{partner.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type *</Label>
                        <Input type="select" defaultValue={missionToEdit.type} onChange={(e) => setType(e.target.value)} bsSize="sm" required >
                          <option value=""></option>
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
                        <Label for="date">Date *</Label>
                        <Input type="date" value={formatDate(missionToEdit.time?.date)} onChange={(e) => setTime((prevTime) => ({ ...prevTime, date: e.target.value }))} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="hours">Horaires *</Label>
                        <Input type="text" placeholder={missionToEdit.time?.hours} onChange={(e) => setTime((prevTime) => ({ ...prevTime, hours: e.target.value }))} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Précision sur le lieu *</Label>
                        <Input type="email" placeholder={missionToEdit.location?.place} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, place: e.target.value }))} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="remuneration">Rémunération *</Label>
                        <Input type="text" placeholder={missionToEdit.remuneration} onChange={(e) => setRemuneration(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="description">Description *</Label>
                        <Input type="textarea" placeholder={missionToEdit.description} onChange={(e) => setDescription(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="fullAddress">Adresse</Label>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="fullAddress">N° *</Label>
                            <Input type="text" placeholder={missionToEdit.location?.number} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, number: e.target.value }))} bsSize="sm" required />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Rue *</Label>
                            <Input type="text" placeholder={missionToEdit.location?.street} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, street: e.target.value }))} bsSize="sm" required />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="fullAddress">Code postal *</Label>
                            <Input type="text" placeholder={missionToEdit.location?.ZIPcode} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, ZIPcode: e.target.value }))} bsSize="sm" required />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Ville *</Label>
                            <Input type="text" placeholder={missionToEdit.location?.city} onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, city: e.target.value }))} bsSize="sm" required />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="requiredMembers">Masseurs requis *</Label>
                        <Input type="number" placeholder={missionToEdit.requiredMembers} onChange={(e) => setRequiredMembers(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="capacity">Jauge *</Label>
                        <Input type="text" placeholder={missionToEdit.capacity} onChange={(e) => setCapacity(e.target.value)} bsSize="sm" required />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="teamBilling">Facturation équipe</Label>
                        <Input type="select" defaultValue={missionToEdit.teamBilling} onChange={(e) => setTeamBilling(e.target.value)} bsSize="sm">
                          <option value=""></option>
                          <option value="to do">À faire</option>
                          <option value="in progress">En cours</option>
                          <option value="done">Fait</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="partnerBilling">Facturation partenaire</Label>
                        <Input type="select" defaultValue={missionToEdit.partnerBilling} onChange={(e) => setPartnerBilling(e.target.value)} bsSize="sm">
                          <option value=""></option>
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
                        <Input type="textarea" placeholder={missionToEdit.notes} onChange={(e) => setNotes(e.target.value)} bsSize="sm" />
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
                      <Label for="title">Titre *</Label>
                      <Input type="text" onChange={(e) => setTitle(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="status">Statut</Label>
                      <Input type="select" onChange={(e) => setStatus(e.target.value)} bsSize="sm">
                        <option value=""></option>
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
                      <Label for="partner">Partenaire *</Label>
                      <Input type="select" onChange={(e) => setPartner(e.target.value)} bsSize="sm" required >
                        <option value=""></option>
                        {partners && partners.map((partner, index) => (
                          <option key={index} value={partner._id}>{partner.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="col-md-6">

                    <FormGroup>
                      <Label for="type">Type *</Label>
                      <Input type="select" onChange={(e) => setType(e.target.value)} bsSize="sm" required >
                        <option value=""></option>
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
                      <Label for="date">Date *</Label>
                      <Input type="date" onChange={(e) => setTime((prevTime) => ({ ...prevTime, date: e.target.value }))} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="hours">Horaires *</Label>
                      <Input type="text" onChange={(e) => setTime((prevTime) => ({ ...prevTime, hours: e.target.value }))} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">

                    <FormGroup>
                      <Label for="place">Précision sur le lieu *</Label>
                      <Input type="email" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, place: e.target.value }))} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="remuneration">Rémunération *</Label>
                      <Input type="text" onChange={(e) => setRemuneration(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="description">Description *</Label>
                      <Input type="textarea" onChange={(e) => setDescription(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="fullAddress">Adresse</Label>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="siret">N° *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, number: e.target.value }))} bsSize="sm" required />
                        </div>
                        <div className="col-md-6">
                          <Label for="siret">Rue *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, street: e.target.value }))} bsSize="sm" required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Label for="siret">Code postal *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, ZIPcode: e.target.value }))} bsSize="sm" required />
                        </div>
                        <div className="col-md-6">
                          <Label for="siret">Ville *</Label>
                          <Input type="text" onChange={(e) => setLocation((prevLocation) => ({ ...prevLocation, city: e.target.value }))} bsSize="sm" required />
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="requiredMembers">Masseurs requis *</Label>
                      <Input type="number" onChange={(e) => setRequiredMembers(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="capacity">Jauge *</Label>
                      <Input type="text" onChange={(e) => setCapacity(e.target.value)} bsSize="sm" required />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="teamBilling">Facturation équipe</Label>
                      <Input type="select" onChange={(e) => setTeamBilling(e.target.value)} bsSize="sm">
                        <option value=""></option>
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
                        <option value=""></option>
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

      {showRegisterModal && (
        <div className=''>
          <Modal isOpen={toggleRegisterModal} toggle={toggleRegisterModal}>
            <ModalHeader toggle={toggleRegisterModal}>S'inscrire à une mission</ModalHeader>
            <ModalBody>
              {missionToRegisterTo && (
                <div>
                  <p>Êtes-vous sûr.e de vouloir vous inscrire à la mission '{missionToRegisterTo.title}' ?</p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button className='action-button' onClick={() => handleRegister()}>
                Confirmer
              </Button>
              <Button className='cancel-button' onClick={toggleRegisterModal}>
                Annuler
              </Button>
              {validationMessage && (
                <span className='text-danger font-italic pt-3'>{validationMessage}</span>
              )}
            </ModalFooter>
          </Modal>
        </div>
      )}

      {showDropModal && (
        <div className=''>
          <Modal isOpen={toggleDropModal} toggle={toggleDropModal}>
            <ModalHeader toggle={toggleDropModal}>Se désinscrire à une mission</ModalHeader>
            <ModalBody>
              {console.log("missionToDrop: ", missionToDrop)}
              {missionToDrop && missionToDrop.registeredMember && (
                <p>
                  Êtes-vous sûr de vouloir vous désinscrire '{missionToDrop.registeredMember.fullName}' de la mission '{missionToDrop.title}' ?
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button className='action-button' onClick={() => handleDrop()}>
                Confirmer
              </Button>
              <Button className='cancel-button' onClick={toggleDropModal}>
                Annuler
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}

      {showAutoDropModal && (
        <div className=''>
          <Modal isOpen={toggleAutoDropModal} toggle={toggleAutoDropModal}>
            <ModalHeader toggle={toggleAutoDropModal}>Se désinscrire à une mission</ModalHeader>
            <ModalBody>
              {missionToDrop && (
                <p>Êtes-vous sûr de vouloir vous désinscrire de la mission '{missionToDrop.title}' ?</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button className='action-button' onClick={() => handleAutoDrop()}>
                Confirmer
              </Button>
              <Button className='cancel-button' onClick={toggleAutoDropModal}>
                Annuler
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}

    </div >
  );
}

export default AllMissionsAdminDash;
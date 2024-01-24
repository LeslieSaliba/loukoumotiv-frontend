import React, { useState, useEffect } from 'react';
import Loading from '../Frequents/Loading';
import { useSelector, useDispatch } from "react-redux";
import { getUserID } from '../userInfo/getTeamData';
import { getAllMissions, registerToMission } from '../redux/actions/missions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import { toast } from "react-hot-toast";
import registered from '../assets/icones/inscrit_noir.png';
import not_registered from '../assets/icones/desinscrit_noir.png';
import see_details from '../assets/icones/voir_noir.png';
import full from '../assets/icones/cant_noir.png';

function AllMissionsMasseurDash() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.filter(mission => mission.status === 'to do'));
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDropModal, setShowDropModal] = useState(false);
  const [missionToSee, setMissionToSee] = useState({});
  const [missionToRegisterTo, setMissionToRegisterTo] = useState(null);
  const [missionToDrop, setMissionToDrop] = useState(null);
  const LoggedMemberId = getUserID();

  const [title, setTitle] = useState(missionToSee.title || '');
  const [status, setStatus] = useState(missionToSee.status || '');
  const [partner, setPartner] = useState(missionToSee.partner || '');
  const [type, setType] = useState(missionToSee.type || '');
  const [time, setTime] = useState({
    date: missionToSee.date || '',
    hours: [missionToSee.hours || ''],
  });
  const [description, setDescription] = useState(missionToSee.description || '');
  const [location, setLocation] = useState({
    place: missionToSee.place || '',
    number: missionToSee.number || '',
    street: missionToSee.street || '',
    ZIPcode: missionToSee.ZIPcode || '',
    city: missionToSee.city || '',
  });
  const [remuneration, setRemuneration] = useState(missionToSee.remuneration || '');
  const [requiredMembers, setRequiredMembers] = useState(missionToSee.requiredMembers || '');
  const [capacity, setCapacity] = useState(missionToSee.capacity || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllMissions())
        setLoading(false);
      } catch (error) {
        console.error('Erreur', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch])

  // setTimeout(() => {
  //   console.log("missions", missions);
  // }, 5000);

  const toggleDetailsModal = (mission) => {
    setMissionToSee(mission);
    setShowDetailsModal(!showDetailsModal)
  }

  const toggleFullModal = () => {
    setShowFullModal(!showFullModal)
  }

  const toggleRegisterModal = (Id, title, LoggedMemberId) => {
    setMissionToRegisterTo({ Id, title });
    setShowRegisterModal(!showRegisterModal)
  }

  const handleRegister = () => {
    if (missionToRegisterTo && missionToRegisterTo.Id) {
      try {
        dispatch(registerToMission(missionToRegisterTo.Id, LoggedMemberId, token));
        toast.success(`Inscription réussie !`)
        setTimeout(() => {
          setShowRegisterModal(false);
          window.location.reload()
        }, 3000);
      }
      catch {
        toast.error(`Oups, réessayez plus tard`)
      }
    };
  }

  const toggleDropModal = (Id, title) => {
    setMissionToDrop({ Id, title });
    setShowDropModal(!showDropModal)
  }

  return (
    <div className="container ">
      <div className='scrollable-table'>
        <div className='container-table'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Partenaire</th>
                <th scope="col">Type</th>
                <th scope="col">Date(s)</th>
                <th scope="col">Heures</th>
                <th scope="col">Masseurs requis</th>
                <th scope="col">Rémunération</th>
                <th scope="col">Détails</th>
                <th scope="col">S'inscrire</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className='text-center'>
                    <Loading />
                  </td>
                </tr>
              )
                : missions.length === 0 ? (
                  <tr>
                    <td colSpan="9" className='text-center font-italic'>Aucune mission Loukoumotiv à venir.</td>
                  </tr>
                ) 
                : (
                  missions &&
                  missions.map((mission) => (
                    <tr key={mission._id} className={mission.requiredMembers === mission.registeredMembers.length ? "full-mission-masseur" : ""}>
                      <td scope="row">{mission.title}</td>
                      <td>{mission.partner.name}</td>
                      <td>{mission.type}</td>
                      <td>{new Date(mission.time.date).toLocaleDateString("en-GB")}</td>
                      <td>
                        {mission.time.hours.map((hour, index) => (
                          <div key={index}>{hour}</div>
                        ))}
                      </td>
                      <td>{mission.requiredMembers}</td>
                      <td>{mission.remuneration}</td>
                      <td>
                        <img className="table-action-icon" src={see_details} alt="détails" onClick={() => toggleDetailsModal(mission)} />
                      </td>
                      <td>
                        {mission.requiredMembers === mission.registeredMembers.length ?
                          <img className="table-action-icon" src={full} alt="complète" onClick={() => toggleFullModal()} /> :
                          (mission.registeredMembers && mission.registeredMembers.some(member => member._id === LoggedMemberId) ? (
                            <img className="table-action-icon" src={registered} alt="inscrit" onClick={() => toggleDropModal(mission._id, mission.title)} />
                          ) : (
                            <img className="table-action-icon" src={not_registered} alt="non inscrit" onClick={() => toggleRegisterModal(mission._id, mission.title)} />
                          ))
                        }
                      </td>
                    </tr>
                  )))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && (
        <div>
          <Modal isOpen={toggleDetailsModal} toggle={toggleDetailsModal}>
            {missionToSee && (
              < Form className="form-modal">
                <ModalHeader toggle={toggleDetailsModal}>Détails de la mission</ModalHeader>
                <ModalBody>
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="title">Titre</Label>
                        <Input type="text" value={missionToSee.title} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="status">Statut</Label>
                        <Input type="select" value={missionToSee.status} bsSize="sm" disabled >
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
                        <Label for="partner">Partenaire</Label>
                        <Input type="email" value={missionToSee.partner.name} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" value={missionToSee.type} bsSize="sm" disabled >
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
                        <Label for="date">Date</Label>
                        <Input type="text" value={missionToSee.time.date} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="hours">Horaires</Label>
                        <Input type="text" value={missionToSee.time.hours} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="place">Précision sur le lieu</Label>
                        <Input type="email" value={missionToSee.location.place} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="remuneration">Rémunération</Label>
                        <Input type="text" value={missionToSee.remuneration} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" value={missionToSee.description} bsSize="sm" disabled />
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
                            <Input type="text" value={missionToSee.location?.number} bsSize="sm" disabled />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Rue</Label>
                            <Input type="text" value={missionToSee.location?.street} bsSize="sm" disabled />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Label for="fullAddress">Code postal</Label>
                            <Input type="text" value={missionToSee.location?.ZIPcode} bsSize="sm" disabled />
                          </div>
                          <div className="col-md-6">
                            <Label for="fullAddress">Ville</Label>
                            <Input type="text" value={missionToSee.location?.city} bsSize="sm" disabled />
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="requiredMembers">Masseurs requis</Label>
                        <Input type="number" value={missionToSee.requiredMembers} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="capacity">Jauge</Label>
                        <Input type="text" value={missionToSee.capacity} bsSize="sm" disabled />
                      </FormGroup>
                    </div>
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button className='action-button' onClick={toggleDetailsModal}>
                    Ok
                  </Button>
                </ModalFooter>
              </Form>
            )}
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
                  <p className='font-italic'>Vous recevrez une confirmation d'inscription sous quelques jours.
                    <br />
                    <br /> Si vous avez un empêchement ou ne souhaitez plus participer à la mission, vous devrez passer par l'un des administrateurs.
                  </p>
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
            </ModalFooter>
          </Modal>
        </div>
      )}

      {showDropModal && (
        <div className=''>
          <Modal isOpen={toggleDropModal} toggle={toggleDropModal}>
            <ModalHeader toggle={toggleDropModal}>S'inscrire à une mission</ModalHeader>
            <ModalBody>
              {missionToDrop && (
                <div>
                  <p>Vous ne pouvez pas vous désinscrire de la mission '{missionToDrop.title}' sans passer par un administrateur.</p>
                  <p>Merci de prévenir en amont si vous avez un empêchement ou ne souhaitez plus participer à la mission.</p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button className='action-button' onClick={toggleDropModal}>
                Ok
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}

      {showFullModal && (
        <div className=''>
          <Modal isOpen={showFullModal} toggle={toggleFullModal}>
            <ModalHeader toggle={toggleFullModal}>Mission déjà complète</ModalHeader>
            <ModalBody>
              <div>
                <p>Cette mission a atteint le nombre maximum de loukoums masseurs inscrits !</p>
                <br />
                <p>On rajoute des missions régulièrement, stay tuned !</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className='action-button' onClick={toggleFullModal}>
                Ok
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}

    </div >
  );
}

export default AllMissionsMasseurDash;
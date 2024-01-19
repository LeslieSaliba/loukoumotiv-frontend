import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllMissions, getMissionById, getMissionByType, DropMission, dropMission, getMissionsByTeamMember } from '../redux/actions/missions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../CSS/Dashboard.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';
import registered from '../assets/icones/inscrit_noir.png';
import not_registered from '../assets/icones/désinscrit_noir.png';
import see_details from '../assets/icones/voir_noir.png';

function MyMissionsMasseurDash() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDropModal, setShowDropModal] = useState(false);
  const [missionToSee, setMissionToSee] = useState({});
  const [missionToDrop, setMissionToDrop] = useState(null);
  const LoggedMemberId = localStorage.getItem('id');

  useEffect(() => {
    dispatch(getMissionsByTeamMember(LoggedMemberId))
  }, [dispatch])

  setTimeout(() => {
    console.log("missions", missions);
  }, 5000);

  const toggleDetailsModal = (mission) => {
    setMissionToSee(mission);
    setShowDetailsModal(!showDetailsModal)
  }

  const handleSee = () => {
    if (missionToSee && missionToSee._id) {
      setShowDetailsModal(false);
    }
  };

  const toggleDropModal = (Id, title) => {
    setMissionToDrop({ Id, title });
    setShowDropModal(!showDropModal)
  }

  return (
    <div className="container ">
      <table className="table scrollable-table">
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
          {missions.length === 0 ? (
            <tr>
              <td colSpan="9" className='text-center font-italic'>Vous n'êtes encore inscrit à aucune mission Loukoumotiv'. <br />
                Inscrivez-vous via l'onglet 'Toutes les missions'.</td>
            </tr>
        ) : (
            missions.map((mission) => (
        <tr key={mission._id}>
          <td scope="row">{mission.title}</td>
          <td>{mission.partner.name}</td>
          <td>{mission.type}</td>
          <td>{new Date(mission.time.date).toLocaleDateString("en-GB")}</td>
          <td>{mission.time.hours}</td>
          <td>{mission.requiredMembers}</td>
          <td>{mission.remuneration}</td>
          <td>
            <img className="table-action-icon" src={see_details} alt="détails" onClick={() => toggleDetailsModal(mission)} />
          </td>
          <td>
            <img
              className="table-action-icon"
              src={not_registered}
              alt="s'inscrire"
              onClick={() => toggleDropModal(mission._id, mission.title)}
            />
          </td>
        </tr>
        ))
          )}
      </tbody>
    </table>

      {
    showDetailsModal && (
      <div>
        <Modal isOpen={toggleDetailsModal} toggle={toggleDetailsModal}>
          {missionToSee && (
            < Form className="form-modal">
              <ModalHeader toggle={toggleDetailsModal}>Mettre à jour la mission</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="title">Titre</Label>
                      <Input type="text" name="title" id="title" value={missionToSee.title || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="type">Type</Label>
                      <Input type="select" name="type" id="type" value={missionToSee.type || ''} bsSize="sm" disabled >
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
                      <Input type="email" name="partner" id="partner" value={missionToSee.partner || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="place">Précision sur le lieu</Label>
                      <Input type="email" name="place" id="place" value={missionToSee.place || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="date">Date</Label>
                      <Input type="date" name="date" id="date" value={missionToSee.date || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="hours">Hours</Label>
                      <Input type="text" name="hours" id="hours" value={missionToSee.hours || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input type="text" name="description" id="description" value={missionToSee.description || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="remuneration">Rémunération</Label>
                      <Input type="text" name="remuneration" id="remuneration" value={missionToSee.remuneration || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="fullAddress">Adresse</Label>
                      <div className="row">
                        <div className="col-md-6">
                          <Input type="text" name="location.number" id="locationNumber" value={missionToSee.location?.number || ''} placeholder="N° de rue" bsSize="sm" disabled />
                        </div>
                        <div className="col-md-6">
                          <Input type="text" name="location.street" id="locationStreet" value={missionToSee.location?.street || ''} placeholder="Rue" bsSize="sm" disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Input type="text" name="location.ZIPcode" id="locationZIPcode" value={missionToSee.location?.ZIPcode || ''} placeholder="Code postal" bsSize="sm" disabled />
                        </div>
                        <div className="col-md-6">
                          <Input type="text" name="location.city" id="locationCity" value={missionToSee.location?.city || ''} placeholder="Ville" bsSize="sm" disabled />
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="requiredMembers">Masseurs requis</Label>
                      <Input type="number" name="requiredMembers" id="requiredMembers" value={missionToSee.requiredMembers || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="capacity">Jauge</Label>
                      <Input type="text" name="capacity" id="capacity" value={missionToSee.capacity || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="registeredMembers">Masseurs inscrits</Label>
                      <Input type="text" name="registeredMembers" id="registeredMembers" value={missionToSee.registeredMembers || ''} bsSize="sm" disabled />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="status">Statut</Label>
                      <Input type="select" name="status" id="status" value={missionToSee.status || ''} bsSize="sm" disabled >
                        <option value="to do">À venir</option>
                        <option value="done">Fait</option>
                        <option value="cancelled">Annulée</option>
                      </Input>
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <FormGroup>
                      <Label for="notes">Notes</Label>
                      <Input type="textarea" name="notes" id="notes" value={missionToSee.notes || ''} bsSize="sm" disabled />
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
    )
  }

  {
    showDropModal && (
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
    )
  }

    </div >
  );
}

export default MyMissionsMasseurDash;
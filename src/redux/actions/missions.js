import axios from 'axios';

export const getAllMissions = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/missions/getAll`)
            .then((response) => {
                const missions = response.data.missions
                dispatch({
                    type: "getAllMissions",
                    payload: missions,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'affichage des missions", error)
            })
    }
}

export const getMissionById = (Id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/missions/getById/${Id}`)
            .then((response) => {
                const mission = response.data.mission
                dispatch({
                    type: "getMissionById",
                    payload: mission,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage de la mission (Id : ${Id})`, error)
            })
    }
}

export const addMission = (title, description, partner, location, type, time, capacity, requiredMembers, registeredMembers, remuneration, status, teamBilling, partnerBilling, notes) => {
    const newMission = { title, description, partner, location, type, time, capacity, requiredMembers, registeredMembers, remuneration, status, teamBilling, partnerBilling, notes }
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/missions/add`, newMission)
            .then((response) => {
                const mission = response.data.mission
                const id = response.data.id
                dispatch({
                    type: "addMission",
                    payload: { mission, id },
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout de la mission", error)
            })
    }
}

export const getMissionByType = (type) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/missions/getByType`, type)
            .then((response) => {
                const missions = response.data.missions
                dispatch({
                    type: "getMissionByType",
                    payload: missions,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage des missions de type "${type}"`, error)
            })
    }
}

export const deleteMission = (Id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_URL}/missions/delete/${Id}`)
            .then((response) => {
                dispatch({
                    type: "deleteMission",
                    payload: Id,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de la suppression de la mission`, error)
            })
    }
}

export const updateMission = (Id, title, description, partner, location, type, time, capacity, requiredMembers, remuneration, status, teamBilling, partnerBilling, notes) => {
    const updatedMission = { title, description, partner, location, type, time, capacity, requiredMembers, remuneration, status, teamBilling, partnerBilling, notes }
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/missions/update/${Id}`, updatedMission)
            .then((response) => {
                const mission = response.data.mission
                const id = response.data.Id
                dispatch({
                    type: "updateMission",
                    payload: { mission, id },
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour de la mission", error)
            })
    }
}

export const getMissionsByStatus = (status) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/missions/getByStatus`, status)
            .then((response) => {
                const missions = response.data.missions
                dispatch({
                    type: "getMissionsByStatus",
                    payload: missions,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage des missions au statut "${status}"`, error)
            })
    }
}

export const getMissionsByPartnerBillingStatus = (partnerBilling) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/missions/getByPartnerBillingStatus`, partnerBilling)
            .then((response) => {
                const missions = response.data.missions
                dispatch({
                    type: "getMissionsByPartnerBillingStatus",
                    payload: missions,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage des missions dont la facturation partenaire est "${partnerBilling}"`, error)
            })
    }
}

export const getMissionsByTeamBillingStatus = (teamBilling) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/missions/getByPartnerBillingStatus`, teamBilling)
            .then((response) => {
                const missions = response.data.missions
                dispatch({
                    type: "getMissionsByTeamBillingStatus",
                    payload: missions,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage des missions dont la facturation partenaire est "${teamBilling}"`, error)
            })
    }
}

export const getMissionsByTeamMember = (teamMemberId) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/missions/getMissionsByTeamMember/${teamMemberId}`)
            .then((response) => {
                const missions = response.data.missions
                dispatch({
                    type: "getMissionsByTeamMember",
                    payload: missions,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage des missions du membre (Id : ${teamMemberId})`, error)
            })
    }
}

export const registerToMission = (missionId, teamMemberId) => {
    const newRegistration = { missionId, teamMemberId }
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/missions/register`, newRegistration)
            .then((response) => {
                const mission = response.data.mission
                const id = response.data.missionId
                dispatch({
                    type: "registerToMission",
                    payload: { mission, id },
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'inscription du membre à la mission`, error)
            })
    }
}

export const dropMission = (missionId, teamMemberId) => {
    const newDrop = { missionId, teamMemberId }
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/missions/drop`, newDrop)
            .then((response) => {
                const mission = response.data.mission
                const id = response.data.missionId
                dispatch({
                    type: "dropMission",
                    payload: { mission, id },
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la désinscription du membre à la mission", error)
            })
    }
}
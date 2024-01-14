import axios from 'axios';

export const getAllMembers = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/team/getAll`)
            .then((response) => {
                const teamMembers = response.data.teamMembers
                dispatch({
                    type: "getAllMembers",
                    payload: teamMembers,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'affichage de l'équipe", error)
            })
    }
}

export const getMemberById = (Id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/team/getById/${Id}`)
            .then((response) => {
                const member = response.data.teamMember
                // console.log(member); 
                dispatch({
                    type: "getMemberById",
                    payload: member,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage du membre (Id : ${Id} de l'équipe`, error)
            })
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/team/login`, { email, password })
            .then((response) => {
                const token = response.data.token
                const id = response.data.id
                // console.log(member); 
                dispatch({
                    type: "login",
                    payload: { token, id },
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la connexion", error)
            })
    }
}

export const addMember = (fullName, role, email, phoneNumber, password) => {
    const newMember = { fullName, role, email, phoneNumber, password }
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/team/add`, newMember)
            .then((response) => {
                const member = response.data.teamMember
                dispatch({
                    type: "addMember",
                    payload: member,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du membre de l'équipe", error)
            })
    }
}

export const getByRole = (role) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/team/getByRole`, role)
            .then((response) => {
                const members = response.data.teamMembers
                dispatch({
                    type: "getByRole",
                    payload: members,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage des membres "${role}"`, error)
            })
    }
}

export const deleteMember = (Id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_URL}/team/delete`, Id)
            .then((response) => {
                const id = response.data.Id
                dispatch({
                    type: "deleteMember",
                    payload: id,
                });
            })
            .catch((error) => {
                console.error("Erreur de la suppression du membre", error)
            })
    }
}

export const updateMember = (Id, fullName, phoneNumber, email, password, dateOfBirth, fullAddress, instagram, siret, IBAN, joiningDate, drivingLicense, motorized, notes, picture) => {
    const updatedMember = { fullName, phoneNumber, email, password, dateOfBirth, fullAddress, instagram, siret, IBAN, joiningDate, drivingLicense, motorized, notes, picture }
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/team/update/${Id}`, updatedMember)
            .then((response) => {
                const member = response.data.teamMember
                const id = response.data.Id
                dispatch({
                    type: "updateMember",
                    payload: { member, id },
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour du membre", error)
            })
    }
}

export const switchToMasseur = (Id) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/team/switchToMasseur/${Id}`)
            .then((response) => {
                const member = response.data.teamMember
                const id = response.data.Id
                dispatch({
                    type: "switchToMasseur",
                    payload: { member, id },
                });
            })
            .catch((error) => {
                console.error(`Erreur lors du passage au rôle "masseur"`, error)
            })
    }
}

export const switchToAdmin = (Id) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/team/switchToAdmin/${Id}`)
            .then((response) => {
                const member = response.data.teamMember
                const id = response.data.Id
                dispatch({
                    type: "switchToAdmin",
                    payload: { member, id },
                });
            })
            .catch((error) => {
                console.error(`Erreur lors du passage au rôle "admin"`, error)
            })
    }
}
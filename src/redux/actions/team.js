import axios from 'axios';

export const getAllMembers = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/team/getAll`)
            .then((response) => {
                const teamMembers = response.data.teamMembers
                console.log(response)
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
        return new Promise((resolve, reject) => {
            axios
                .post(`${process.env.REACT_APP_URL}/team/login`, { email, password })
                .then((response) => {
                    const { token, id, role } = response.data;
                    dispatch({
                        type: "login",
                        payload: { token, id, role },
                    });
                    localStorage.setItem("token", token);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};

export const addMember = (fullName, role, phoneNumber, email, password, joiningDate, notes, token) => {
    const newMember = { fullName, role, email, phoneNumber, password, joiningDate, notes }
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/team/add`, newMember, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
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

export const deleteMember = (Id, token) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_URL}/team/delete/${Id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
            .then((response) => {
                dispatch({
                    type: "deleteMember",
                    payload: Id,
                });
            })
            .catch((error) => {
                console.error("Erreur de la suppression du membre", error)
            })
    }
}

export const updateMember = (Id, fullName, role, phoneNumber, email, dateOfBirth, number, street, ZIPcode, city, instagram, siret, IBAN, joiningDate, drivingLicense, motorized, notes, picture, password, token) => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('role', role);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('number', number);
    formData.append('street', street);
    formData.append('ZIPcode', ZIPcode);
    formData.append('city', city);
    formData.append('instagram', instagram);
    formData.append('siret', siret);
    formData.append('IBAN', IBAN);
    formData.append('joiningDate', joiningDate);
    formData.append('drivingLicense', drivingLicense);
    formData.append('motorized', motorized);
    formData.append('notes', notes);
    formData.append('file', picture);
    if (password) {
        formData.append('password', password);
    }

    return (dispatch) => {
        console.log(formData);
        axios.put(`${process.env.REACT_APP_URL}/team/update/${Id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'authorization': `Bearer ${token}`,
            },
        })
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

export const switchToMasseur = (Id, token) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/team/switchToMasseur/${Id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
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

export const switchToAdmin = (Id, token) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/team/switchToAdmin/${Id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
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
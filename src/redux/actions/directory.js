import axios from 'axios';

export const getAllContacts = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/directory/getAll`)
            .then((response) => {
                const contacts = response.data.contacts
                dispatch({
                    type: "getAllContacts",
                    payload: contacts,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'affichage des contacts du répertoire", error)
            })
    }
}

export const getContactById = (Id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/directory/getById/${Id}`)
            .then((response) => {
                const contact = response.data.contact
                dispatch({
                    type: "getContactById",
                    payload: contact,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage du contact (Id : ${Id}) du répertoire`, error)
            })
    }
}

export const addContact = (fullName, email, phoneNumber, position, companyName, notes) => {
    const newContact = { fullName, email, phoneNumber, position, companyName, notes }
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/directory/add`, newContact)
            .then((response) => {
                const contact = response.data.contact
                dispatch({
                    type: "addContact",
                    payload: contact,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du contact au répertoire", error)
            })
    }
}

export const deleteContact = (Id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_URL}/directory/delete/${Id}`)
            .then((response) => {
                dispatch({
                    type: "deleteContact",
                    payload: Id,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression du contact", error)
            })
    }
}

export const updateContact = (Id, fullName, email, phoneNumber, position, companyName, notes) => {
    const updatedContact = { Id, fullName, email, phoneNumber, position, companyName, notes}
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/directory/update/${Id}`, updatedContact)
            .then((response) => {
                const contact = response.data.contact
                const id = response.data.Id
                dispatch({
                    type: "updateContact",
                    payload: { contact, id },
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour du contact", error)
            })
    }
}
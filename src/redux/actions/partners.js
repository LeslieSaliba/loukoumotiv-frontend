import axios from 'axios';

export const getAllPartners = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/partners/getAll`)
            .then((response) => {
                const partners = response.data.partners
                dispatch({
                    type: "getAllPartners",
                    payload: partners,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'affichage des partenaires", error)
            })
    }
}

export const getPartnerById = (Id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/partners/getById/${Id}`)
            .then((response) => {
                const partner = response.data.partner
                dispatch({
                    type: "getPartnerById",
                    payload: partner,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage du partenaire (Id : ${Id})`, error)
            })
    }
}

export const addPartner = (name, type, location, website, referenceContact, notes) => {
    const newPartner = { name, type, location, website, referenceContact, notes }
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/partners/add`, newPartner)
            .then((response) => {
                const partner = response.data.partner
                const id = response.data.id
                dispatch({
                    type: "addPartner",
                    payload: { partner, id },
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout du partenaire", error)
            })
    }
}

export const getPartnerByType = (type) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/partners/getByType`, type)
            .then((response) => {
                const partners = response.data.partners
                dispatch({
                    type: "getPartnerByType",
                    payload: partners,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage des partenaires de type "${type}"`, error)
            })
    }
}

export const deletePartner = (Id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_URL}/partners/delete`, Id)
            .then((response) => {
                const id = response.data.Id
                dispatch({
                    type: "deletePartner",
                    payload: id,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression du partenaire", error)
            })
    }
}

export const updatePartner = (Id, name, type, location, website, referenceContact, notes) => {
    const updatedPartner = { name, type, location, website, referenceContact, notes }
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_URL}/partners/update/${Id}`, updatedPartner)
            .then((response) => {
                const partner = response.data.partner
                const id = response.data.Id
                dispatch({
                    type: "updateMember",
                    payload: { partner, id },
                });
            })
            .catch((error) => {
                console.error("Erreur de la mise à jour du partenaire", error)
            })
    }
}
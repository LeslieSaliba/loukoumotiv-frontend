import axios from 'axios';

export const getAllSubscribers = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/newsletter/getAll`)
            .then((response) => {
                const subscribers = response.data.subscribed
                dispatch({
                    type: "getAllSubscribers",
                    payload: subscribers,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'affichage des inscrits à la newsletter", error)
            })
    }
}

export const subscribeToNewsletter = (email) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_URL}/newsletter/subscribe`, { email })
            .then((response) => {
                const subscriber = response.data.subscribed
                dispatch({
                    type: "subscribeToNewsletter",
                    payload: subscriber,
                });
            })
            .catch((error) => {
                console.error("Erreur de l'inscription à la newsletter", error)
            })
    }
}

export const getSubscriberById = (Id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/newsletter/getById/${Id}`)
            .then((response) => {
                const subscriber = response.data.subscriber
                dispatch({
                    type: "getSubscriberById",
                    payload: subscriber,
                });
            })
            .catch((error) => {
                console.error(`Erreur lors de l'affichage de l'inscrit (Id : ${Id}) à la newsletter`, error)
            })
    }
}

export const unsubscribeToNewsletter = (Id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_URL}/newsletter/unsubscribe/${Id}`)
            .then((response) => {
                dispatch({
                    type: "unsubscribeToNewsletter",
                    payload: Id,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la désinscription à la newsletter", error)
            })
    }
}
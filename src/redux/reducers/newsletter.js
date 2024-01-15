const newsletterReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllSubscribers":
            return action.payload;
        case "subscribeToNewsletter":
            return [...state, action.payload];
        case "getSubscriberById":
            return action.payload;
        case "unsubscribeToNewsletter":
            return state.filter((subscriber) => subscriber._id !== action.payload);
        default: return state
    }
}

export default newsletterReducer; 
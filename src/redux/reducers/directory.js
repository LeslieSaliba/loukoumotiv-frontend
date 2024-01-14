const directoryReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllContacts":
            return action.payload;
        case "getContactById":
            return action.payload;
        case "addContact":
            return [...state, action.payload];
        case "deleteContact":
            return state.filter((contact) => contact._id !== action.payload);
        case "updateContact":
            return state.map((contact) =>
                contact._id === action.payload.id ? action.payload.contact : contact);
        default: return state
    }
}

export default directoryReducer; 
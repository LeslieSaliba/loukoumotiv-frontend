const partnersReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllPartners":
            return action.payload;
        case "getPartnerById":
            return action.payload;
        case "addPartner":
            return [...state, action.payload];
        case "getPartnerByType":
            return action.payload;
        case "deletePartner":
            return state.filter((partner) => partner._id !== action.payload);
        case "updatePartner":
            return state.map((partner) =>
                partner._id === action.payload.id ? action.payload.partner : partner);
        default: return state
    }
}

export default partnersReducer; 
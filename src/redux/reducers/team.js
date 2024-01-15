const teamReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllMembers":
            return action.payload;
        case "getMemberById":
            return action.payload;
        case "login":
            return action.payload;
        case "addMember":
            return [...state, action.payload];
        case "getByRole":
            return action.payload;
        case "deleteMember":
            return state.filter((member) => member._id !== action.payload);
        case "updateMember":
            return state.map((member) =>
                member._id === action.payload.id ? action.payload.member : member);
        case "switchToMasseur":
            return state.map((member) =>
                member._id === action.payload.id ? action.payload.member : member);
        case "switchToAdmin":
            return state.map((member) =>
                member._id === action.payload.id ? action.payload.member : member);
        default: return state
    }
}

export default teamReducer; 
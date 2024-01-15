const missionsReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllMissions":
            return action.payload;
        case "getMissionById":
            return action.payload;
        case "addMission":
            return [...state, action.payload];
        case "getMissionByType":
            return action.payload;
        case "deleteMission":
            return state.filter((mission) => mission._id !== action.payload);
        case "updateMission":
            return state.map((mission) =>
                mission._id === action.payload.id ? action.payload.mission : mission);
        case "getMissionsByStatus":
            return action.payload;
        case "getMissionsByPartnerBillingStatus":
            return action.payload;
        case "getMissionsByTeamBillingStatus":
            return action.payload;
            // check the two below 
        case "registerToMission":
            return state.map((mission) =>
                mission._id === action.payload.id ? action.payload.mission : mission);
        case "dropMission":
            return state.map((mission) =>
                mission._id === action.payload.id ? action.payload.mission : mission);
        default: return state
    }
}

export default missionsReducer; 
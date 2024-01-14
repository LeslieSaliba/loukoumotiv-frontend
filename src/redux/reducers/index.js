import { combineReducers } from "redux";
import teamReducer from "./team";
import missionsReducer from "./missions";
import partnersReducer from "./partners";
import directoryReducer from "./directory";
import newsletterReducer from "./newsletter";

const allReducers = combineReducers({
    team: teamReducer,
    missions: missionsReducer,
    partners: partnersReducer,
    directory: directoryReducer,
    newsletter: newsletterReducer
});

export default allReducers;
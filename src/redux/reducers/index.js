import { combineReducers } from "redux";
import teamReducer from "./team";

const allReducers = combineReducers({
    team: teamReducer
});

export default allReducers;
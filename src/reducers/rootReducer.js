import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import PlacesReducer from "./placesReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
    userData: UserReducer,
    places: PlacesReducer,
    location: locationReducer
});
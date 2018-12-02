import {SAVE_PHARMACIES_PLACES, SAVE_GAS_STATIONS_PLACES,
    SAVE_SCHOOLS_PLACES, SAVE_RESTAURANTS_PLACES} from '../reducers/types';

const initialState = {
    pharmacies: [],
    tireFitting: [],
    schools: [],
    restaurants: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PHARMACIES_PLACES:
            return {
                ...initialState,
                pharmacies: action.payload
            };
        case SAVE_GAS_STATIONS_PLACES:
            return {
                ...initialState,
                tireFitting: action.payload
            };
        case SAVE_SCHOOLS_PLACES:
            return {
                ...initialState,
                schools: action.payload
            };
        case SAVE_RESTAURANTS_PLACES:
            return {
                ...initialState,
                restaurants: action.payload
            };
        default:
            return state;
    }
}

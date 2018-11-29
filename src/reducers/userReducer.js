import {SUBMIT_SIMPLE_REGISTRATION} from '../reducers/types';


const initialState = {
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_SIMPLE_REGISTRATION:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

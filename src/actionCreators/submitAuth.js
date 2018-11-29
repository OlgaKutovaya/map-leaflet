import {SUBMIT_SIMPLE_REGISTRATION} from '../reducers/types';

export const submitSimpleRegistration = (user) => {
    return {
        type: SUBMIT_SIMPLE_REGISTRATION,
        payload: user
    }
};
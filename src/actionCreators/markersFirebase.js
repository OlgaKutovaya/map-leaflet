import {db} from "../firebase";
import {GET_ALL_MARKERS, SAVE_NEW_MARKER} from "../reducers/types";

export const addNewMarker = (newMarkers) => {
    return {
        type: SAVE_NEW_MARKER,
        payload: newMarkers
    }
};

export const saveMarkersToFirebase = () => {
    return (dispatch, getState) => {
        const state = getState();
        const markers = state.location.markers;
        if (state.userData.user) {
            db.ref('/users').child(state.userData.user.uid).child('markers').set(markers);
            alert('Marks have been saved successfully')
        } else {
            alert('Please Sign in');
        }
    }
};

export const getMarkersFromFirebase = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.userData.user) {
            db.ref('/users').child(state.userData.user.uid).child('markers').once('value')
                .then(snapshot => {
                    console.log(snapshot.val());
                    dispatch({
                        type: GET_ALL_MARKERS,
                        payload: snapshot.val()
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            alert('Please Sign in');
        }
    }
};

export const deleteMarkersFromFirebase = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.userData.user) {
            db.ref('/users').child(state.userData.user.uid).child('markers').remove()
                .then(snapshot => {
                    dispatch({
                        type: GET_ALL_MARKERS,
                        payload: null
                    });
                    alert('Marks have been deleted successfully')
                })
                .catch(error => {
                    console.log(error);
                })

        } else {
            alert('Please Sign in');
        }
    }
};

export const hideMarkersFromMap = () => {
    return {
        type: GET_ALL_MARKERS,
        payload: null
    }
};


















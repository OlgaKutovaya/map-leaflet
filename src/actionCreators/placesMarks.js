import {
    SAVE_PHARMACIES_PLACES,
    SAVE_GAS_STATIONS_PLACES,
    SAVE_SCHOOLS_PLACES,
    SAVE_RESTAURANTS_PLACES,
    CHANGE_MY_LOCATION
} from '../reducers/types';
import axios from 'axios';


export const getPlaces = (place) => {
    return (dispatch, getState) => {
        const stateLocation = getState();
        const lat = stateLocation.location.lat;
        const lng = stateLocation.location.lng;

        axios.get("https://api.foursquare.com/v2/venues/explore" +
            "?client_id=TV5KVPARSRO1LRTSRH0PCAU3GIOB1IC4TSCVOSBQUV1HO03W&client_secret=TEBUK5IG3KY12CS1WQCAK53EVTWQ24JOD1KYBK332APWGF2E" +
            "&v=20181101&limit=15&radius=600&ll=" + lat + "," + lng + "&query=" + place)
            .then(response => {
                let placesData = response.data.response.groups[0].items;
                if (response.data.meta.code === 200) {
                    if (place === 'аптека') {
                        dispatch({type: SAVE_PHARMACIES_PLACES, payload: placesData});
                    } else if (place === 'шиномонтаж') {
                        console.log(response.data);
                        dispatch({type: SAVE_GAS_STATIONS_PLACES, payload: placesData});
                    } else if (place === 'школа') {
                        dispatch({type: SAVE_SCHOOLS_PLACES, payload: placesData});
                    } else if (place === 'ресторан') {
                        dispatch({type: SAVE_RESTAURANTS_PLACES, payload: placesData});
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
};


export const findMyLocation = (lat, lng) => {
    return {
        type: CHANGE_MY_LOCATION,
        payload: [lat, lng]
    }
};



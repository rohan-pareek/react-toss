import { baseURL } from '../config';
import { ADD_PLAYER, LOADER } from '../actionTypes';

export const addPlayer = (payload) => {
    return (dispatch) => {
        dispatch({
            type: LOADER,
            active: true
        })
        fetch(baseURL + '/player/addPlayer', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: LOADER,
                active: false
            })
            if(data.statusCode === 1) {
                const params = {
                    groupID: JSON.parse(payload).groupID
                }
                dispatch(fetchPlayers(JSON.stringify(params)))
            }
        })
    }
}

export const fetchPlayers = (payload) => {
    return (dispatch) => {
        dispatch({
            type: LOADER,
            active: true
        })
        fetch(baseURL + '/player/fetchPlayers', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: LOADER,
                active: false
            })
            dispatch({
                type: ADD_PLAYER,
                payload: data.data
            })
            
        })
    }
}

export const deletePlayer = (payload) => {
    return (dispatch) => {
        dispatch({
            type: LOADER,
            active: true
        })
        fetch(baseURL + '/player/deletePlayer', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: LOADER,
                active: false
            })
            if(data.statusCode === 1) {
                const params = {
                    groupID: JSON.parse(payload).groupID
                }
                dispatch(fetchPlayers(JSON.stringify(params)))
            }
        })
    }
}

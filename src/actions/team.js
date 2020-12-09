import { baseURL } from '../config';
import { LOADER, FETCH_PINNED_TEAM } from '../actionTypes';

export const pinTeam = (payload) => {
    return (dispatch) => {
        dispatch({
            type: LOADER,
            active: true
        })
        fetch(baseURL + '/team/pinTeams', {
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
                dispatch(fetchPinnedTeams(JSON.stringify(params)))
            }
        })
    }
}

export const fetchPinnedTeams = (payload) => {
    return (dispatch) => {
        dispatch({
            type: LOADER,
            active: true
        })
        fetch(baseURL + '/team/fetchPinnedTeams', {
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
                type: FETCH_PINNED_TEAM,
                payload: data.data
            })
            
        })
    }
}

import { baseURL } from '../config';
import { LOGIN, LOGOUT, LOADER, SUCCESS, ERROR } from '../actionTypes';

export const login = (payload) => {
    return (dispatch) => {
        dispatch({
            type: LOADER,
            active: true
        })
        fetch(baseURL + '/group/login', {
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
                if (data.statusCode === 1) {
                    localStorage.setItem('groupID', JSON.parse(payload).groupID)
                    dispatch({
                        type: LOGIN,
                        payload: JSON.parse(payload).groupID
                    })
                }
            })
    }
}

export const signup = (payload) => {
    return (dispatch) => {
        dispatch({
            type: LOADER,
            active: true
        })
        fetch(baseURL + '/group/addGroup', {
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
                if (data.statusCode === 1) {
                    dispatch({
                        type: SUCCESS,
                        payload: data.statusMessage
                    })
                } else {
                    dispatch({
                        type: ERROR,
                        payload: data.statusMessage
                    })
                }
            })
    }
}


export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('groupID');
        dispatch({
            type: LOGOUT
        })
    }
}
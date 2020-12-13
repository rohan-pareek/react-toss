const { LOGIN, LOGOUT, LOADER, SUCCESS, ERROR } = require("../actionTypes");

export const groupReducer = (state = { groupID: null, isLoggedIn: false, loader: false, successMessage: null, errorMessage: null }, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, groupID: action.payload, isLoggedIn: true, errorMessage: null, successMessage: null, loader: false };
        case LOGOUT:
            return { ...state, groupID: null, isLoggedIn: false, errorMessage: null, successMessage: null, loader: false };
        case LOADER: {
            return { ...state, loader: action.active }
        }
        case ERROR: {
            return { ...state, errorMessage: action.payload, successMessage: null, loader: false }
        }
        case SUCCESS: {
            return { ...state, errorMessage: null, successMessage: action.payload, loader: false }
        }
        default:
            return state;
    }
}
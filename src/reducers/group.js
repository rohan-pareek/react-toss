const { LOGIN, LOGOUT, LOADER, SUCCESS, ERROR } = require("../actionTypes");

export const groupReducer = (state = { groupID: null, isLoggedIn: false, loader: false, successMessage: null, errorMessage: null }, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, groupID: action.payload, isLoggedIn: true, errorMessage: null, successMessage: null };
        case LOGOUT:
            return { ...state, groupID: null, isLoggedIn: false, errorMessage: null, successMessage: null };
        case LOADER: {
            return { ...state, loader: action.payload }
        }
        case ERROR: {
            return { ...state, errorMessage: action.payload, successMessage: null }
        }
        case SUCCESS: {
            return { ...state, errorMessage: null, successMessage: action.payload }
        }
        default:
            return state;
    }
}
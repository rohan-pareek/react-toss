const { LOGIN, LOGOUT, LOADER } = require("../actionTypes");

export const groupReducer = (state = { groupID: null, isLoggedIn: false, loader: false }, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, groupID: action.payload, isLoggedIn: true };
        case LOGOUT:
            return { ...state, groupID: null, isLoggedIn: false };
        case LOADER: {
            return { ...state, loader: action.payload }
        }
        default:
            return state;
    }
}
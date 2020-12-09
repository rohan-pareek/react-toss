const { ADD_PLAYER, LOADER } = require("../actionTypes");

export const playerReducer = (state = { players: [], loader: false }, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return { ...state, players: [...action.payload] };
        case LOADER: {
            return { ...state, loader: action.active }
        }
        default:
            return state;
    }
}
const { FETCH_PINNED_TEAM, LOADER } = require("../actionTypes");

export const teamReducer = (state = { pinnedTeams: [], loader: false }, action) => {
    switch (action.type) {
        case FETCH_PINNED_TEAM:
            return { ...state, pinnedTeams: [...action.payload][0] };
        case LOADER: {
            return { ...state, loader: action.active }
        }
        default:
            return state;
    }
}
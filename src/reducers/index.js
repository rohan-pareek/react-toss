import { combineReducers } from 'redux';
import { playerReducer } from './player';
import { groupReducer } from './group';
import { teamReducer } from './team';

const rootReducer = combineReducers({
    player: playerReducer,
    group: groupReducer,
    team: teamReducer
})

export default rootReducer;
import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer';
import gamesReducer from './games_reducer';
import sessionReducer from './session_reducer.js';
import betsReducer from './bets_reducer.js';

const rootReducer = combineReducers({
    errors: errorsReducer,
    games: gamesReducer,
    session: sessionReducer,
    bets: betsReducer

});

export default rootReducer;
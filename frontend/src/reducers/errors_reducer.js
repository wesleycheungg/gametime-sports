import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer.js';
import betErrorsReducer from './bet_errors_reducer';


const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  bet: betErrorsReducer
});

export default errorsReducer;
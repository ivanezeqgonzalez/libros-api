import { combineReducers } from 'redux';
import librosReducers from './librosReducers';
import validacionReducer from './validacionReducer';

export default combineReducers({
    libros: librosReducers,
    error: validacionReducer
});
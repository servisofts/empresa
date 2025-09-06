import { combineReducers } from 'redux';


import { Reducers} from '../Pages'
const reducers = combineReducers({
    ...Reducers
   
});

export default (state, action) => {
    switch (action.type) {
        case 'USUARIO_LOGOUT':
            state = undefined;
            break;
        default:
            break;
    }
    return reducers(state, action);
}
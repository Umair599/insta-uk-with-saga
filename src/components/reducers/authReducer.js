import {SIGN_IN, SIGN_OUT, SIGN_UP} from '../actions/types';
const INITIAL_STATE={
    loading: false,
};
export default (state=INITIAL_STATE, action)=>{
switch (action.type){
    case SIGN_UP:
        return {...state, loading:true}
    case SIGN_IN:
        return {...state, loading:true}
    case SIGN_OUT:
        return {...state, loading:false};
    default:
        return state;
    }
};
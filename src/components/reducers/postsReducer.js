import {FETCH_POSTS, GET_POSTS} from '../actions/types';
const INITIAL_STATE={
    loading: false,
    posts:[]
};
 export default (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case FETCH_POSTS:
        return { ...state, loading: true };
        case GET_POSTS:
            return {...state, posts: action.data};
        default:
            return state;
        }
    };
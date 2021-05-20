import * as ActionTypes from './ActionTypes';

export const favorites = (state = {
    favorites: []
},action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE:
            if(state.favorites.some(el => el === action.payload)) 
                return state;
            else 
                return state.favorites.concat(action.payload);
        
        default:
            return state;
    }
}
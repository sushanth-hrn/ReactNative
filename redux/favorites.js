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

        case ActionTypes.DELETE_FAVORITE:
            return state.favorites.filter((fav) => fav !== action.payload);
        
        default:
            return state;
    }
}
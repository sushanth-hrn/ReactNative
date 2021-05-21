import * as ActionTypes from './ActionTypes';
import { baseurl } from '../shared/baseUrl';

export const fetchComments = () => (dispatch) => {
    return fetch(baseurl + 'comments')
        .then((response) => {
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, (err) => {
            var errMess = new Error(err.message);
            throw errMess;
        })
        .then((response) => response.json())
        .then((comments) => dispatch(addComments(comments)))
        .catch((err) => dispatch(commentsFailed(err.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    var date = new Date();
    var isoDate = date.toISOString();
    var commentData = {
        "dishId": dishId,
        "rating": rating,
        "author": author,
        "comment": comment,
        "date": isoDate
    }
    setTimeout(() => {
        dispatch(addComment(commentData))
    },2000);
}

export const addComment = (commentData) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: commentData
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseurl + 'dishes')
        .then((response) => {
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, (err) => {
            var errMess = new Error(err.message);
            throw errMess;
        })
        .then((response) => response.json())
        .then((dishes) => dispatch(addDishes(dishes)))
        .catch((err) => dispatch(dishesFailed(err.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseurl + 'leaders')
        .then((response) => {
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error; 
            }
        }, (error) => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then((response) => response.json())
        .then((leaders) => dispatch(addLeaders(leaders)))
        .catch((error) => dispatch(leadersFailed(error)))
} 

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseurl + 'promotions')
        .then((response) => {
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error; 
            }
        }, (error) => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then((response) => response.json())
        .then((promotions) => dispatch(addPromos(promotions)))
        .catch((error) => dispatch(promosFailed(error)))
} 

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});

export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    },2000)
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});
import * as actionType from './actionType';
import axios from '../../axios-Order';

export const addIngredient = (name) => {

    return  {
        type : actionType.ADD_INGREDIENT ,
        ingredientName : name ,
    }

}


export const removeIngredient = (name) => {

    return  {
        type : actionType.REMOVE_INGREDIENT,
        ingredientName : name ,
    }

}


export const setIngredients =(ingredients) => {
    return {
            type : actionType.SET_INGREDIENTS,
            Ingredients : ingredients ,
    }
}
export const fetchIngredientsFail =() => {
    return { 
        type : actionType.MASSAGE_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {

        return dispatch => {
            axios.get("https://burger-builder-1ae7a.firebaseio.com/ingredient.json")
                 .then(response => {
                        dispatch(setIngredients(response.data));
                }).catch(err=>{
                     dispatch(fetchIngredientsFail());
                 })
        }

} 
    
   

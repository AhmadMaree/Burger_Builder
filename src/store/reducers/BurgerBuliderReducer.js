import * as actionType from '../actions/actionType';
import {updateObject} from '../../shared/utility';

const initialState = {
    ingredient : null,
    totlaPrice : 3,
    Erorr : false ,
    building : false,
}

const INGREDIENT_PRICE = {
    cheese : 0.3 , 
    salad : 0.5 , 
    meat : 1.7 , 
    bacon : 0.7, 
}

const addIngredient = (state , action) => { 
    const updateIngredient = {[action.ingredientName] : state.ingredient[action.ingredientName] +1}
    const updateIngredients = updateObject(state.ingredient , updateIngredient)
    const updateState = {
        ingredient : updateIngredients,
        totlaPrice : state.totlaPrice + INGREDIENT_PRICE[action.ingredientName] ,
        building : true
    }
   return updateObject(state,updateState)
}
const removeIngredient = (state , action) => { 
    const updateIng= {[action.ingredientName] : state.ingredient[action.ingredientName] -1}
    const updateIngs = updateObject(state.ingredient , updateIng)
    const updatest = {
        ingredient : updateIngs,
        totlaPrice : state.totlaPrice - INGREDIENT_PRICE[action.ingredientName] ,
        building : true
    }
    return updateObject(state,updatest)
}

const massageIngedientFail = (state , action) => {
    return updateObject (state , {Erorr : true })  
}
const setIngredients = (state , action) => {
    return updateObject(state , {
        ingredient :  {
            salad : action.Ingredients.salad ,
             bacon : action.Ingredients.bacon ,
            cheese : action.Ingredients.cheese ,
            meat : action.Ingredients.meat ,
        } , 
        totlaPrice : 3 ,
        Erorr : false ,
        building : false
      })
}

const BurgerBuilderReducer = (state = initialState , action) => {

    switch(action.type) { 
        case actionType.ADD_INGREDIENT : return addIngredient(state,action)
        case actionType.REMOVE_INGREDIENT : return removeIngredient(state,action)
        case actionType.MASSAGE_INGREDIENTS_FAIL : return massageIngedientFail(state,action)
        case actionType.SET_INGREDIENTS : return setIngredients(state,action)
        default : return state ;
    }

}
export default BurgerBuilderReducer ;
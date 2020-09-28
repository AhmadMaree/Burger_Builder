import * as actionType from '../actions/actionType';

const initialState = {
    ingredient : {
        salad : 0 ,
        meat : 0 ,
        bacon : 0,
        cheese : 0 
    },
    totlaPrice : 3,
}

const INGREDIENT_PRICE = {
    cheese : 0.3 , 
    salad : 0.5 , 
    meat : 1.7 , 
    bacon : 0.7, 
}

const BurgerBuilderReducer = (state = initialState , action) => {

    switch(action.type) { 

        case actionType.ADD_INGREDIENT :
             
           return {
                ...state,
                ingredient : {
                    ...state.ingredient ,
                    [action.ingredientName] : state.ingredient[action.ingredientName] +1
                },
                totlaPrice : state.totlaPrice + INGREDIENT_PRICE[action.ingredientName] ,
            }  
        case actionType.REMOVE_INGREDIENT : 

            return {
                ...state ,
                ingredient : {
                    ...state.ingredient ,
                    [action.ingredientName] : state.ingredient[action.ingredientName] -1
                },
                totlaPrice : state.totlaPrice - INGREDIENT_PRICE[action.ingredientName] ,
            }
        default : 
            return state ;

    }

}

export default BurgerBuilderReducer ;
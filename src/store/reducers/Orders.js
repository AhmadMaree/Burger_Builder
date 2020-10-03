import * as actionType from '../actions/actionType';
import {updateObject} from '../../shared/utility';

const initialState = {  
    Order :[],
    Loading : false , 
    purchased : false ,

}

const purchaseBurgerSucces = (state , action) => {
    const newOrder = updateObject (action.OrderData ,{id : action.orderid})
    return updateObject(state , {
        purchased : true ,
        Order : state.Order.concat(newOrder) })
}
const purchaseBurgerFailer = (state , action) => {
    return updateObject(state, { Loading : false})
}

const purchaseBurgerStart = (state , action) => {
    return updateObject(state, { Loading : true})
}
const purchaseInit = (state , action) => {
    return updateObject(state, { purchased : false})
}
const fetchOrederStart = (state,action) => {
    return updateObject(state, { Loading : true})
}
const fetchOrederSuccess = (state,action) => {
    return updateObject(state, { 
        Loading : false,
        Order : action.order
    })
}
const messageIngredientFail = (state,action) => {
    return updateObject(state, { Loading : false})
}


const orderReducer = (state = initialState , action ) => {

    switch(action.type) {
        case actionType.PURCHASE_BURGER_SUCCES :return purchaseBurgerSucces(state,action)
        case actionType.PURCHASE_BURGER_FAILER :return purchaseBurgerFailer(state,action)
        case actionType.PURCHASE_BURGER_START :return purchaseBurgerStart(state,action)
        case actionType.PURCHASE_INIT : return purchaseInit(state,action)
        case actionType.FETCH_OREDER_START :return fetchOrederStart(state,action)
        case actionType.FETCH_OREDER_SUCCESS : return fetchOrederSuccess(state,action)
        case actionType.MASSAGE_INGREDIENTS_FAIL : return messageIngredientFail(state,action)
        default :return state ;
    }
}
export default orderReducer;
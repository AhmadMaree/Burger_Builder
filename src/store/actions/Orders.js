import * as actionType from './actionType';
import axios from '../../axios-Order';

export const  purchaseBurgerSucces = ( id,OrderData) => {

    return {
            type : actionType.PURCHASE_BURGER_SUCCES , 
            OrderData : OrderData , 
            orderid : id ,
    }

}

export const  purchaseBurgerFailer = (error) => {

    return {
            type : actionType.PURCHASE_BURGER_FAILER , 
            error : error , 
    }

}

export const purchaseBurgerStart =  () => {
        return {
            type : actionType.PURCHASE_BURGER_START,
        }
}

export const purchaseBurger = (orderData) => {

        return dispatch => {
            dispatch(purchaseBurgerStart())
            axios.post("/orders.json", orderData)
            .then(response => {
                dispatch(purchaseBurgerSucces(response.data.name , orderData))

            }).catch(err =>{
                dispatch(purchaseBurgerFailer(err))
            });
        }

}

export const purchaseInit = () => {
    return {
        type : actionType.PURCHASE_INIT,
    }
}


export const fetchOrderStart = () => {
    return {
        type : actionType.FETCH_OREDER_START ,
    }
}
export const fetchOrderSucces = (order) => {
    return {
        type : actionType.FETCH_OREDER_SUCCESS,
        order : order ,
    }
}
export const fetchOrderFailer = (error) => {
    return {
        type : actionType.FETCH_OREDER_FAILER ,
        error : error ,
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json')
        .then(res =>{
            const fetchOrder = []; 
            for(let key in res.data){
                fetchOrder.push({
                     ...res.data[key] , 
                     id : key
                });
            }
           dispatch(fetchOrderSucces(fetchOrder))

        }).catch(err=>{
            dispatch(fetchOrderFailer(err))
        })
    }
}


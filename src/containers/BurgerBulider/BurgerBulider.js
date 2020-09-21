import React , {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICE = {
    cheese : 0.3 , 
    salad : 0.5 , 
    meat : 1.7 , 
    bacon : 0.7, 
}

class BurgerBulider extends Component {

    state = {
        ingredient : {
            bacon : 0, 
            meat :0 ,
            salad :0,
            cheese :0
        },
        totlaPrice : 3,
        purchasable : false ,
        purchasing: false,
    }

    updatePerchasebleState (ingredient){

        const sum = Object.keys(ingredient)
                    .map(igKey => {
                        return ingredient[igKey];
                    }).reduce ((sum,el) =>{
                        return sum+el ;
                    },0);
        
        
        this.setState({
            purchasable : sum >0
        })
        
    }
    purchaseHandler =() => {
        this.setState({
                purchasing: true
        })
    }
    purchaseCloseHandler =()=>{
        this.setState({
            purchasing: false
    })
    }
    purchaseContinueHandler= () => {
        alert ("Continue ... ");
    }

    addIngredientHandler = (type) => {
        const oldCount =this.state.ingredient[type];
        const updateCount= oldCount+1;
        const updatedIngredient ={ 
            ...this.state.ingredient
        };

        updatedIngredient[type] = updateCount;
        const additionPrice = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totlaPrice;
        const newPrice = oldPrice + additionPrice ; 

        this.setState({
            ingredient:updatedIngredient,
            totlaPrice : newPrice,
        })
        this.updatePerchasebleState(updatedIngredient);
    }
    removeIngredientHandler=(type) => {
        const oldCount =this.state.ingredient[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount= oldCount-1;
        const updatedIngredient ={ 
            ...this.state.ingredient
        };

        updatedIngredient[type] = updateCount;
        const additionPrice = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totlaPrice;
        const newPrice = oldPrice - additionPrice ; 

        this.setState({
            ingredient:updatedIngredient,
            totlaPrice : newPrice,
        })

        this.updatePerchasebleState(updatedIngredient);
    }
    render(){ 
        const disableInfo = {
            ...this.state.ingredient
        };

        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0 ;
        }

        return (
        <React.Fragment>

            <Modal show = {this.state.purchasing} closeModal={this.purchaseCloseHandler}>
                    <OrderSummary
                    totalPrice={this.state.totlaPrice}
                    canselClicked ={this.purchaseCloseHandler}
                    continueClicked={this.purchaseContinueHandler}
                    ingredient={this.state.ingredient}/>
            </Modal>    
            <Burger ingredient = {this.state.ingredient} />
            <BuildControls 

                    ingredientAdd={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totlaPrice}
                    purchasable ={this.state.purchasable}
                    Oreder={this.purchaseHandler}
            />


        </React.Fragment>
        );
    }

}

export default BurgerBulider;
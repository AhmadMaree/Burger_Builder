import React , {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-Order';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Sppinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';



class BurgerBulider extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInilizationIngredients()
    }

    updatePerchasebleState (ingredient){

        const sum = Object.keys(ingredient)
                    .map(igKey => {
                        return ingredient[igKey];
                    }).reduce ((sum,el) =>{
                        return sum+el ;
                    },0);
        
        return sum >0 ;   
    }
    purchaseHandler =() => {
        if(this.props.isAuthenticated) {
            this.setState({
                purchasing: true
        })
        }else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }
        
    }
    purchaseCloseHandler =()=>{
        this.setState({
            purchasing: false
    })
    }
    purchaseContinueHandler= () => {
             this.props.onPurchaseInit();
             this.props.history.push('/checkout');

    }
    render(){ 
        const disableInfo = {
            ...this.props.ings
        };

        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0 ;
        }
        let LoadingSppiner=  null

        

        let burger = this.props.Erorr ? <p style={{textAlign :"center"}}>There are Erorr in ingreadient!</p> : <Spinner/>;

        if(this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredient = {this.props.ings} />
                    <BuildControls 

                            ingredientAdd={this.props.onIngerdientAdd}
                            removeIngredient={this.props.onIngerdientRemove}
                            disabled={disableInfo}
                            price={this.props.price}
                            isAuth = {this.props.isAuthenticated}
                            purchasable ={this.updatePerchasebleState(this.props.ings)}
                            Oreder={this.purchaseHandler}
                    />
                </React.Fragment>
            ) ;
           LoadingSppiner= (<OrderSummary
                                totalPrice={this.props.price}
                                canselClicked ={this.purchaseCloseHandler}
                                continueClicked={this.purchaseContinueHandler}
                                ingredient={this.props.ings}/>);

           
        }

        return (
        <React.Fragment>

            <Modal show = {this.state.purchasing} closeModal={this.purchaseCloseHandler}>
                   
                   {LoadingSppiner}
                   
            </Modal>    
            
            {burger}

        </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
      ings : state.burgerBuilder.ingredient , 
      price : state.burgerBuilder.totlaPrice , 
      Erorr : state.burgerBuilder.Erorr , 
      isAuthenticated : state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngerdientAdd : (ingsName) => dispatch(action.addIngredient(ingsName)) ,
        onIngerdientRemove : (ingsName)=> dispatch(action.removeIngredient(ingsName)) ,
        onInilizationIngredients : () => dispatch(action.initIngredients()),
        onPurchaseInit : () => dispatch(action.purchaseInit()) , 
        onSetAuthRedirectPath : (path) =>dispatch(action.setRedirctPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBulider,axios));
import React , {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-Order';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Sppinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions/actionType';



class BurgerBulider extends Component {

    state = {
        purchasing: false,
        Loading : false ,
        Erorr : false
    }

    componentDidMount (){
        /*axios.get("https://burger-builder-1ae7a.firebaseio.com/ingredient.json")
             .then(response => {
                 this.setState({
                     
                    ingredient:response.data
                 })
                 console.log(this.state.ingredient); 
             }).catch(err=>{
                this.setState({
                    Erorr : true 
                })
             })*/
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

        

        let burger = this.state.Erorr ? <p style={{textAlign :"center"}}>There are Erorr in ingreadient!</p> : <Spinner/>;

        if(this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredient = {this.props.ings} />
                    <BuildControls 

                            ingredientAdd={this.props.onIngerdientAdd}
                            removeIngredient={this.props.onIngerdientRemove}
                            disabled={disableInfo}
                            price={this.props.price}
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
        if(this.state.Loading){
            LoadingSppiner = <Spinner/>
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
      ings : state.ingredient , 
      price : state.totlaPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngerdientAdd : (ingsName) => dispatch({type : actionType.ADD_INGREDIENT , ingredientName : ingsName}) ,
        onIngerdientRemove : (ingsName)=> dispatch({type : actionType.REMOVE_INGREDIENT , ingredientName : ingsName})

    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBulider,axios));
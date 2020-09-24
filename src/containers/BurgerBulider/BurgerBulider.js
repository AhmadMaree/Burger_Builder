import React , {Component} from 'react';
import axios from '../../axios-Order';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Sppinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICE = {
    cheese : 0.3 , 
    salad : 0.5 , 
    meat : 1.7 , 
    bacon : 0.7, 
}

class BurgerBulider extends Component {

    state = {
        ingredient : null,
        totlaPrice : 3,
        purchasable : false ,
        purchasing: false,
        Loading : false ,
        Erorr : false
    }

    componentDidMount (){
        axios.get("https://burger-builder-1ae7a.firebaseio.com/ingredient.json")
             .then(response => {
                 this.setState({
                     
                    ingredient:response.data
                 })
                 console.log(this.state.ingredient); 
             }).catch(err=>{
                this.setState({
                    Erorr : true 
                })
             })
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
       // alert ("Continue ... ");
       this.setState({Loading : true});
       const order = {
           ingreadient : this.state.ingredient , 
           price : this.state.totlaPrice,
           custmor : {
               name : "Ahmad",
               email : "ahamdmarei1998@gmail.com",

           },
           
       }
        axios.post("/orders.json", order)
             .then(response => {
                this.setState({Loading : false , purchasing : false});
             }).catch(err =>{
                this.setState({Loading : false, purchasing: false});
                console.log(err);
             });


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
        let LoadingSppiner=  null

        

        let burger = this.state.Erorr ? <p style={{textAlign :"center"}}>There are Erorr in ingreadient!</p> : <Spinner/>;

        if(this.state.ingredient) {
            burger = (
                <React.Fragment>
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
            ) ;
           LoadingSppiner= (<OrderSummary
                                totalPrice={this.state.totlaPrice}
                                canselClicked ={this.purchaseCloseHandler}
                                continueClicked={this.purchaseContinueHandler}
                                ingredient={this.state.ingredient}/>);

           
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

export default withErrorHandler(BurgerBulider,axios);
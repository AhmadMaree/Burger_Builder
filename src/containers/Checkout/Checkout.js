import React, { Component } from 'react'; 
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

    
    state ={
        ingredients : null,
        Price : 0 ,
    }

    componentWillMount () {
        
        const quary = new URLSearchParams(this.props.location.search);
        const ingredients= {};
        let price = 0 ;
        for (let param of quary.entries()) {
           // console.log(param[0])
           if(param[0] === 'price'){
            price = param[1];
           }else {
            ingredients[param[0]] = +param[1];
           }
           
        }
        this.setState({
            ingredients:ingredients ,
            Price : price ,
        })
    }

    clickedCancelHandler = () => {
       // console.log(this.props);
        this.props.history.goBack();
    }
    clickedContinueHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }
    render() {
            return (
                <div>
                    <CheckoutSummary 
                       ingredients={this.state.ingredients}
                       checkoutCancelled ={this.clickedCancelHandler}
                       checkoutContinued={this.clickedContinueHandler}
                     />
                     <Route path={this.props.match.path + '/contact-data'} 

                             render = {(props)=> (<ContactData ingredients={this.state.ingredients}
                                                          price = {this.state.Price}
                                                          {...props}
                             />) } />
                </div>
            );
    }
}

export default Checkout;
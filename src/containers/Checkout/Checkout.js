import React, { Component } from 'react'; 
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

    
    state ={
        ingredients : {
            salad : 0 ,
            meat : 0 ,
            cheese : 0 ,
            bacon : 0 ,
        },
        Price : 0 ,
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
                       ingredients={this.props.ings}
                       checkoutCancelled ={this.clickedCancelHandler}
                       checkoutContinued={this.clickedContinueHandler}
                     />
                     <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredient
    }
}

export default connect(mapStateToProps)(Checkout);
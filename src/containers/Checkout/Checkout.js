import React, { Component } from 'react'; 
import {connect} from 'react-redux'
import {Route , Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

    

    
    clickedCancelHandler = () => {
       // console.log(this.props);
        this.props.history.goBack();
    }
    clickedContinueHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }
    render() {

            let checkSummary = <Redirect to ="/" />

            if(this.props.ings) {
                const purshaseRedirect = this.props.purshase ? <Redirect to="/" /> : null
                checkSummary = (  
                <div>
                    {purshaseRedirect}
                    <CheckoutSummary 
                       ingredients={this.props.ings}
                       checkoutCancelled ={this.clickedCancelHandler}
                       checkoutContinued={this.clickedContinueHandler}
                     />
                     <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
                )
            }
         return checkSummary ;
   }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredient , 
        purshase : state.order.purchased ,
    }
}



export default connect(mapStateToProps)(Checkout);
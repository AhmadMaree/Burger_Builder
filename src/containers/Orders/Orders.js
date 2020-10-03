import React, { Component } from 'react' ; 
import {connect} from 'react-redux'

import Order from '../../components/Order/Order';
import axios from '../../axios-Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Sppinner from '../../components/UI/Sppinner/Spinner';

class Orders extends Component {

        

    componentDidMount(){
        this.props.onFetchOrder(this.props.Token , this.props.userid)
    }

    render () {

        let Orders = <Sppinner/>
        if(!this.props.Loading) {
            Orders =               
              this.props.Order.map(item => (
                    <Order 
                        ingredients= {item.ingreadient}
                        price = {item.price}
                        key={item.id}
                    
                    />
                ))
            
        }

        return (
            <div>
                    {Orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        Order : state.order.Order ,
        Loading : state.order.Loading,
        Token : state.auth.idToken ,
        userid : state.auth.userId,

    }
}

const mapDispatchToProps = dispatch => {
    return { 
        onFetchOrder : (token ,userid) => dispatch(actions.fetchOrder(token,userid))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
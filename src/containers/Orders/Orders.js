import React, { Component } from 'react' ; 
import Order from '../../components/Order/Order';
import axios from '../../axios-Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

        state ={
            loading : true ,
            Order : [],
        }   

    componentDidMount(){
        axios.get('/orders.json')
        .then(res =>{
            const fetchOrder = []; 
            for(let key in res.data){
                fetchOrder.push({
                     ...res.data[key] , 
                     id : key
                });
            }
            this.setState({
                loading : false,
                Order : fetchOrder
            })

        }).catch(err=>{
            this.setState({
                loading : false
            })
        })
    }

    render () {
        return (
            <div>
                {this.state.Order.map(item => (
                    <Order 
                        ingredients= {item.ingreadient}
                        price = {item.price}
                        key={item.id}
                    
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);
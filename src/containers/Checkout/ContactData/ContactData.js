import React, { Component } from 'react'; 
import {connect} from 'react-redux';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-Order';
import Sppinner from '../../../components/UI/Sppinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as OrderAciton from '../../../store/actions/index';
import {updateObject , checkValidation} from '../../../shared/utility';
class ContactData extends Component {

    state ={

        OrderForm : {
            name : {
                elementType : 'input' , 
                elementConfig : {
                    placeholder : 'Your Name', 
                    type :'text'
                },
                Validation : {
                    required : true
                },
                valid : false ,
                value : '',
                touched : false
            }, 
            email : {
                elementType : 'input' , 
                elementConfig : {
                    placeholder : 'Email', 
                    type :'text'
                },
                Validation : {
                    required : true ,
                    isEmail : true 
                },
                valid : false ,
                value : '',
                touched : false
            },        
            street :{
                elementType : 'input' , 
                elementConfig : {
                    placeholder : 'Street', 
                    type :'text'
                },
                Validation : {
                    required : true
                },
                valid : false ,
                value : '' ,
                touched : false
            },
            zipcode :{
                elementType : 'input' , 
                elementConfig : {
                    placeholder : 'Zip Code', 
                    type :'text'
                } ,
                Validation : {
                    required : true , 
                    maxlen : 5 ,
                    minlen : 5 ,
                    isNumeric: true,
                },
                valid : false ,
                value : '',
                touched : false
            },
           country :{
                elementType : 'input' , 
                elementConfig : {
                    placeholder : 'Country', 
                    type :'text'
                },
                Validation : {
                    required : true
                },
                valid : false ,
                value : '',
                touched : false

            }, 
            deliverMethod : { 
                elementType :'select', 
                elementConfig :{
                    options: [{vlaue : 'fastest' , displayValue :'Fastest'} ,
                
                               {vlaue : 'cheapest' , displayValue :'Cheapest'} 

                ] ,
                
                },
                value :'cheapest',
                valid : true ,
                Validation : {} ,
            }
            
        } ,
        formIsValid : false,
       

        
    }

    

    

    OrderHandler = (event) => {
        //Reload Inside becouse I'am using Form so Ican prventDefault
        event.preventDefault();
       // console.log(this.props.ingredients);
         const formData = {} ; 
         for(let elementForm in this.state.OrderForm) {
             formData[elementForm] = this.state.OrderForm[elementForm].value;
         }
        const order = {
           ingreadient : this.props.ings , 
           price : this.props.price,
           OrderData : formData,
           userId : this.props.userid,
        }
        this.props.onOrderBurger(order , this.props.token);

        
    }

    onChnageInputHandler =(event,indexInputValue) =>{
         
         const UpdateInsideOrderForm = updateObject(this.state.OrderForm[indexInputValue],{
                value :event.target.value,
                valid:checkValidation(event.target.value,this.state.OrderForm[indexInputValue].Validation),
                touched : true ,
         });
         const UpdateOrderForm = updateObject(this.state.OrderForm ,{
            [indexInputValue] :UpdateInsideOrderForm
        })
         let formisValid = true ;
         for(let inputIdetifier in UpdateOrderForm) {
                formisValid = UpdateOrderForm[inputIdetifier].valid && formisValid;
         }
         this.setState({
             OrderForm : UpdateOrderForm ,
             formIsValid : formisValid ,
         });

    }

    render(){

         let formElementsArray = [];
         for (let key in this.state.OrderForm) {
             formElementsArray.push({
                 id : key ,
                 config : this.state.OrderForm[key]
             })
         }

            let form = (
                <form onSubmit={this.OrderHandler}>
                        {formElementsArray.map(formElement => (
                            <Input 
                                    key ={formElement.id}
                                    elementType={formElement.config.elementType}
                                   elementConfig={formElement.config.elementConfig}
                                   value ={formElement.config.value}
                                   typeValue={formElement.id}
                                   inValid ={!formElement.config.valid}
                                   isContianValdiation ={formElement.config.Validation}
                                   istouched ={formElement.config.touched}
                                   changeInput ={(event) =>this.onChnageInputHandler(event , formElement.id)}
                                    />
                        ))}        
                        <Button  btnType="Success" disabled={!this.state.formIsValid}  >ORDER</Button>
                </form>
            );
            if(this.props.Loading){
                form= <Sppinner/>
            }


            return (
                <div className={classes.ContactData}>
                    <h1>Enter Your ContactData</h1>
                    {form}
                </div>
            )
    }
}


const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredient ,
        price : state.burgerBuilder.totlaPrice , 
        Loading : state.order.Loading ,
        token : state.auth.idToken,
        userid : state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData , token) => dispatch(OrderAciton.purchaseBurger(orderData , token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( ContactData , axios));
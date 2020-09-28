import React, { Component } from 'react'; 
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-Order';
import Sppinner from '../../../components/UI/Sppinner/Spinner';

import Input from '../../../components/UI/Input/Input';

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
        Loading : false , 

        
    }

    checkValidation (value,rules) {
        let isValid = true ; 

        if(rules.required) {

            isValid = value.trim() !== '' && isValid ;
        }

        if(rules.maxlen) {
                isValid = value.length <= rules.maxlen && isValid;
        }

        if(rules.minlen) {
            isValid = value.length >= rules.minlen && isValid;

        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
            return isValid ;
    }

    

    OrderHandler = (event) => {
        //Reload Inside becouse I'am using Form so Ican prventDefault
        event.preventDefault();
       // console.log(this.props.ingredients);

         this.setState({Loading : true});
         const formData = {} ; 
         for(let elementForm in this.state.OrderForm) {
             formData[elementForm] = this.state.OrderForm[elementForm].value;
         }
        const order = {
           ingreadient : this.props.ings , 
           price : this.props.price,
           OrderData : formData,
        }
        axios.post("/orders.json", order)
             .then(response => {
                this.setState({Loading : false });
                this.props.history.push("/")
             }).catch(err =>{
                this.setState({Loading : false});
                console.log(err);
             });
    }

    onChnageInputHandler =(event,indexInputValue) =>{
         const UpdateOrderForm = {
             ...this.state.OrderForm 
         }
         const UpdateInsideOrderForm = {
             ...UpdateOrderForm[indexInputValue]
         }
         UpdateInsideOrderForm.value=event.target.value;
         UpdateInsideOrderForm.valid = this.checkValidation(UpdateInsideOrderForm.value,UpdateInsideOrderForm.Validation);
         UpdateInsideOrderForm.touched = true;
         UpdateOrderForm[indexInputValue] = UpdateInsideOrderForm ; 

         let formisValid = true ;
         for(let inputIdetifier in UpdateOrderForm) {
                formisValid = UpdateOrderForm[inputIdetifier].valid && formisValid;
         }
         console.log(formisValid);
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
            if(this.state.Loading){
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
        ings : state.ingredient ,
        price : state.totlaPrice
    }
}

export default connect(mapStateToProps)(ContactData);
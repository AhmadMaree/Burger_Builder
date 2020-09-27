import React, { Component } from 'react'; 
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-Order';
import Sppinner from '../../../components/UI/Sppinner/Spinner';

import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state ={
        name : '', 
        email : '',
        address :  {
            street :'',
            postalCode :'',
        },
        Loading : false , 

        
    }

    OrderHandler = (event) => {
        //Reload Inside becouse I'am using Form so Ican prventDefault
        event.preventDefault();
        console.log(this.props.ingredients);

         this.setState({Loading : true});
        const order = {
           ingreadient : this.props.ingredients , 
           price : this.props.price,
           custmor : {
               name : "Ahmad",
               email : "ahamdmarei1998@gmail.com",
               address : {
                   street :'',
                   zipcode : '' ,

               }
           },
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

    render(){

            let form = (
                <form>
                        <Input  inputType ={'input'} type="text" name ="name"  placeholder="Your Name" />
                        <Input inputType ={'input'}  type= "email" name ="email"  placeholder="Email" />
                        <Input  inputType ={'input'} type="text" name ="street"  placeholder="Street" />
                        <Input  inputType ={'input'} type="text" name ="postal"  placeholder="Postal Code" />
                        <Button  btnType="Success" Clicked={this.OrderHandler} >ORDER</Button>
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

export default ContactData;
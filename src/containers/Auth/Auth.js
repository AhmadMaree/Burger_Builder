import React, { Component } from 'react'
import {connect} from 'react-redux'

import classes from './Auth.module.css'
import Input from  "../../components/UI/Input/Input"
import Button from  "../../components/UI/Button/Button"
import Sppinner from '../../components/UI/Sppinner/Spinner';
import * as action from '../../store/actions/index';
import { Redirect } from 'react-router-dom'
import {updateObject , checkValidation} from '../../shared/utility';

class Auth extends Component {

    state = {
        controls : {
            email : {
                elementType : 'input' , 
                elementConfig : {
                    placeholder : 'ADD Your Email', 
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
            Password : {
                elementType : 'input' , 
                elementConfig : {
                    placeholder : 'Type Your Pw', 
                    type :'password'
                },
                Validation : {
                    required : true ,
                    maxlen : 7
                },
                valid : false ,
                value : '',
                touched : false
            },      
        },
        isSignup : true ,
    }

    componentDidMount () {
        if(!this.props.bulidingBurger && this.props.redirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }
    

    onChnageInputHandler = (event , controlName) => {
            const UpdateControls = updateObject(this.state.controls , {
                [controlName] : updateObject(this.state.controls[controlName],{
                    value : event.target.value ,
                    valid : checkValidation(event.target.value,this.state.controls[controlName].Validation),
                    touched : true
                })
            }) 
            this.setState({
                controls : UpdateControls
            })
    }
    onSubmitHandler =(event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.Password.value , this.state.isSignup);
    }
    onSwitchSingHandler = () => {
        this.setState(prevState => {
            return {isSignup :!prevState.isSignup}
        })
    }
    render() {
        
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id : key ,
                config : this.state.controls[key]
            })
        }

      let form= formElementsArray.map(formElement => (
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
        ))

        if (this.props.loading) {
            form = <Sppinner />
        }
        let errorMassage = null 
        if(this.props.error) {
        errorMassage = <p style={{color :'red'}}>{this.props.error.message}</p>
        }
        let RedirctSucssefulSign = null 
        if(this.props.isAuthenticated) {
            RedirctSucssefulSign = <Redirect to={this.props.redirectPath}/>
        }
        return (
                <div className={classes.Auth}> 
                        {RedirctSucssefulSign}
                        {errorMassage}
                    <form onSubmit={this.onSubmitHandler}>
                        {form}
                        <Button btnType="Success">Submit</Button>
                    </form>
                  <Button btnType="Danger" 
                          Clicked ={this.onSwitchSingHandler}
                  >Switch to {this.state.isSignup ? "SignIn" : 'SignUp'}</Button>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error : state.auth.error,
        loading : state.auth.loading,
        isAuthenticated : state.auth.idToken !== null , 
        bulidingBurger : state.burgerBuilder.building , 
        redirectPath : state.auth.redirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email , password , isSignup)=> dispatch(action.auth(email,password,isSignup)) , 
        onSetAuthRedirectPath : () => dispatch(action.setRedirctPath('/'))
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(Auth) ;
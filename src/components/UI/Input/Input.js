import React from'react' ;
import classes from './Input.module.css';


const input = (props) => {

    let validationError = null;
    let inputElement = null ;
    let classesElement = [classes.InputElement] ;
    if(props.inValid && props.isContianValdiation &&  props.istouched ){
        classesElement.push(classes.InValid);
    validationError = <p className={classes.ValidationError}>Please enter a valid {props.typeValue}!</p>;
    }
    switch(props.elementType) {
        case 'input' : 
                  inputElement=   <input onChange={props.changeInput}
                                         className ={classesElement.join(' ') }
                                          {...props.elementConfig} 
                                          value ={props.value}/>
                        break ;
        case 'textarea' : 
                 inputElement= <textarea onChange={props.changeInput}
                         className ={classesElement.join(' ') } {...props.elementConfig}  
                                            value ={props.value}/>
                            break; 
        case 'select' :
            inputElement = (
                <select onChange={props.changeInput}
                      className={classesElement.join(' ')} value={props.value} >
                    {props.elementConfig.options.map(option => (
                        <option key ={option.vlaue} vlaue={option.value}>
                                {option.displayValue}
                        </option>
                    ))}

                </select>
            )
            break;
        default : 
            inputElement = <input  onChange={props.changeInput}
                className ={classesElement.join(' ') } {...props.elementConfig} 
                                         value ={props.value} />
    }

    return (
        <div className ={classes.Input}>
            <label>{props.label}</label>
             {inputElement}
             {validationError}
        </div>
    )

}

export default input;
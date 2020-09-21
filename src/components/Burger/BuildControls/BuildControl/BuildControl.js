
import React from 'react';
import classes from './BuildControl.module.css';


const buildcontrol = (props)=> {

    
    return(
        <div className={classes.BuildControl}>

            <label className={classes.Label}>{props.Label}</label>
            <button 
            className={classes.Less}
            onClick={props.ingredientRemoveLess}
            disabled={props.disabled}
            >Less</button>
            <button className={classes.More} onClick={props.ingredientAddMore}>More</button>  
        </div>
    );
}

export default buildcontrol;
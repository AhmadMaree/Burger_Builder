
import React from 'react';
import classes from './BuildControl.module.css';


const buildcontrol = (props)=> {

    
    return(
        <div className={classes.BuildControl}>

            <label className={classes.Label}>{props.Label}</label>
            <button className={classes.Less}>Less</button>
            <button className={classes.More}>More</button>  
        </div>
    );
}

export default buildcontrol;
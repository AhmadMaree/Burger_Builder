import React from 'react';
import classes from './DrawerToggle.module.css';

const drawertoggle = (props) => {

    return (
            <div className={classes.DrawerToggle}
            onClick ={props.Clicked}>
                <div></div>            
                <div></div>
                <div></div>
            </div>
    )
}

export default drawertoggle;
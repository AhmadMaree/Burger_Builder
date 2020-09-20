
import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const Controls = [
    {Label : "Salad"},
    {Label : "Bacon"},
    {Label : "Cheese"},
    {Label : "Meat"}
];

const buildcontrols = (props)=> {


    return (

        <div className={classes.BuildControls}>
            {Controls.map(itemControl => {
               return <BuildControl key={itemControl.Label} Label={itemControl.Label}/>
            })}
            
        </div>
    );
}

export default buildcontrols;
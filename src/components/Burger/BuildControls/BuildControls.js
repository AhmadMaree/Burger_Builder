
import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const Controls = [
    {Label : "Salad" , type : "salad"},
    {Label : "Bacon" , type : "bacon"},
    {Label : "Cheese" , type: "cheese"},
    {Label : "Meat" , type : "meat"}
];

const buildcontrols = (props)=> {


    return (

        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
            {Controls.map(itemControl => {
               return <BuildControl 
               key={itemControl.Label} 
               Label={itemControl.Label}
               ingredientAddMore = {() => props.ingredientAdd(itemControl.type)}
               ingredientRemoveLess = { ()=>props.removeIngredient(itemControl.type)}
               disabled ={props.disabled[itemControl.type]}
               />
            })}
            <button className={classes.OrderButton} 
                    onClick = {props.Oreder}
                    disabled={!props.purchasable}>{props.isAuth ? "OrderNow!" : "GO TO SINGUP!"}</button>
        </div>
    );
}

export default buildcontrols;
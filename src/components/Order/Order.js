import React from 'react';
import classes from './Order.module.css';


const order = (props) => {

    const ingredients = [];

    for(let IngredientsName in props.ingredients) { 
        ingredients.push ({
            name : IngredientsName ,
            amount : props.ingredients[IngredientsName]
        })
    }

    const ingredientOutput = ingredients.map( ig => {
        return (
            <span 
                    key ={ig.name}
                    style={{textTransform :'capitalize',
                            border : '1px soild #ccc',
                            margin : '0px 8px',
                            padding :'6px',
                            display :'inline-block'                     
                }}
            >{ig.name} ({ig.amount})</span>
        )
    });

    return(
    <div className={classes.Order}>
        <p>Ingredient : {ingredientOutput}</p>
        <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )
}

export default order;

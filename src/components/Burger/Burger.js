import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformingredient = Object.keys(props.ingredient)
    .map(ingredientKeys => {
        return [...Array(props.ingredient[ingredientKeys])].map((_,indexValue) => {
            return <BurgerIngredient key={ingredientKeys + indexValue} type ={ingredientKeys}/>
        });
    }).reduce((prvArr,curArr) => {
        return prvArr.concat(curArr);
    },[]);
    
    if(transformingredient.length === 0){
        transformingredient= <p>Please Start add ingredient!</p>;
    }

  return (

    <div className={classes.Burger}>
        <BurgerIngredient type ="bread-top"/>
        {transformingredient}
        <BurgerIngredient type ="bread-bottom"/>
    </div>
  );  
}

export default burger;
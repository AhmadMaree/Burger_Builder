import React from 'react';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {

    const transformIngredient = Object.keys(props.ingredient)
                                .map(igKey => {
                                return (<li key={igKey}> <span style={{textTransform : 'capitalize'}}>{igKey}</span> : {props.ingredient[igKey]}</li>)
                                })
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredient :</p>
            <ul>
                {transformIngredient}
            </ul>
            <p><strong>Current Price : {props.totalPrice.toFixed(2)}</strong></p>
            <p>Contunie to Check out ?</p>
            <Button btnType="Danger" Clicked = {props.canselClicked}>Cansel</Button>
            <Button btnType="Success" Clicked= {props.continueClicked}>Continue</Button>
            </React.Fragment>
    );
};

export default orderSummary;
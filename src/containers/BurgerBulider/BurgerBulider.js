import React , {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBulider extends Component {

    state = {
        ingredient : {
            becon : 0, 
            meat :0 ,
            salad :0,
            cheese :0
        }
    }
    render(){ 
        return (
        <React.Fragment>

            <Burger ingredient = {this.state.ingredient}/>
            <BuildControls/>


        </React.Fragment>
        );
    }

}

export default BurgerBulider;
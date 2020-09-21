import React from 'react';
import classes from './Logo.module.css';
import BurgerLogo from '../../assets/Images/burger-logo.png';


const logo = (props) => { 
    return (
        <div className ={classes.Logo} >
            <img src={BurgerLogo} alt="MyLogoBurger"/>
        </div>
    )
}
export default logo;
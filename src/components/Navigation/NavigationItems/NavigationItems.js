import React from 'react'; 
import classess from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (
            <ul className= {classess.NavigationItems}> 
                <NavigationItem Link="/" exact >Burger Builder</NavigationItem>
                <NavigationItem Link="/Orders"  > Order</NavigationItem>
            </ul>
    );
}
export default navigationItems;
import React from 'react'; 
import classess from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (
            <ul className= {classess.NavigationItems}> 
                <NavigationItem Link="/" exact >Burger Builder</NavigationItem>
                {props.isAuthicated ? <NavigationItem Link="/Orders"  > Order</NavigationItem> : null }
                {!props.isAuthicated ? <NavigationItem Link="/Auth"  > Authenticate</NavigationItem> 
                             : <NavigationItem Link="/logout"  > Logout</NavigationItem>  }
               
            </ul>
    );
}
export default navigationItems;
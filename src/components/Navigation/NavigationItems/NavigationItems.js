import React from 'react'; 
import classess from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (
            <ul className= {classess.NavigationItems}> 
                <NavigationItem Link="/" active > Order</NavigationItem>
                <NavigationItem Link="/"  > Home</NavigationItem>
            </ul>
    );
}
export default navigationItems;
import React from 'react'; 
import classess from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {

    return (
            <li className={classess.NavigationItem}>
                <NavLink to={props.Link} 
                    exact ={props.exact}
                    activeClassName={classes.active}>
                    {props.children}
                </NavLink>
            </li>
    );
}
export default navigationItem;
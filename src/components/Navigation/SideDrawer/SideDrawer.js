import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attechedClasses = [classes.SideDrawer , classes.Close] ;
    if(props.show){
        attechedClasses = [classes.SideDrawer , classes.Open] ;
    }

    return(
        <React.Fragment>
            <Backdrop show={props.show}  clicked={props.closed}  />
            <div className={attechedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
            <nav>
                <NavigationItems isAuthicated={props.isAuth}/>
            </nav>
            </div>
        </React.Fragment>
    )
}
export default sideDrawer;
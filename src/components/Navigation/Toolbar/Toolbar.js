import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle Clicked ={props.toggleDrawer}/>
            <div className={classes.Logo}>
                 <Logo/>
            </div>
            <nav className ={classes.DesktopOnly}>
               <NavigationItems isAuthicated={props.isAuth}/>
            </nav>
        </header>
    )


}
export default toolbar;
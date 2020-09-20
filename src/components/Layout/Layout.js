import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
const layout = (props) => (

    <Auxiliary>
    <div>Toolbar , sideBar , backdrop</div>
    <main className={classes.content}>
        {props.children}
    </main>
    </Auxiliary>

);

export default layout;
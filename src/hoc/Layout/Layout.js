import React , {Component} from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class  Layout extends Component {

    state ={
        showSideDrawer : false,     
    }

    showSideCloseDrawerHandler = () => {
        this.setState({
            showSideDrawer : false
        })
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState) => {
          return  {showSideDrawer : !prevState.showSideDrawer} ;
        } )
    }

    render(){
    
        return (
        <React.Fragment>
            <Toolbar toggleDrawer={this.sideDrawerToggleHandler} />
            <SideDrawer show ={this.state.showSideDrawer} closed ={this.showSideCloseDrawerHandler}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </React.Fragment>
        );
    }
}

export default Layout;
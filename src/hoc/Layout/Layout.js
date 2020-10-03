import React , {Component} from 'react';
import {connect} from 'react-redux'
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
            <Toolbar isAuth ={this.props.isAuthicate} toggleDrawer={this.sideDrawerToggleHandler} />
            <SideDrawer  isAuth ={this.props.isAuthicate} show ={this.state.showSideDrawer} closed ={this.showSideCloseDrawerHandler}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthicate : state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);
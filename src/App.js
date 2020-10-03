import React , {Component} from 'react';
import { Redirect, Route , Switch ,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBulider from './containers/BurgerBulider/BurgerBulider';
import Logout from './containers/Auth/Logout/Logout';
import * as action from './store/actions/index'


const asyncCheckout = React.lazy(() =>
  import ('./containers/Checkout/Checkout')
)
const asyncOrder = React.lazy(() =>
  import ('./containers/Orders/Orders')
)
const asyncAuth = React.lazy(() =>
  import ('./containers/Auth/Auth')
);

class App extends Component {

  componentDidMount () {
    this.props.onAuthSuccess();
  }
  render(){ 

    let routes = (
      <Switch>
            <Route path="/Auth" component={asyncAuth}/>
            <Route  path ="/" exact component={BurgerBulider}/>
            <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
               <Route path="/checkout" component={asyncCheckout}/>
               <Route path="/Orders" component={asyncOrder}/>
               <Route path="/Auth" component={asyncAuth}/>
               <Route path="/logout" component={Logout}/>
               <Route  path ="/" exact component={BurgerBulider}/>
               <Redirect to="/" />
        </Switch>
      )
    }

      return (
        
           <React.Suspense fallback={<div>Loading</div>}>
          <Layout>
             {routes}
          </Layout> 
          </React.Suspense>
        
      );}

}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuthSuccess : () => dispatch(action.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

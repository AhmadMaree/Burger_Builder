import React , {Component} from 'react';
import { Route , Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import BurgerBulider from './containers/BurgerBulider/BurgerBulider';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
class App extends Component {


  render(){ 

      return (
        <div> 
          <Layout>
              <Switch>
               <Route path="/checkout" component={Checkout}/>
               <Route path="/Orders" component={Orders}/>
               <Route  path ="/" exact component={BurgerBulider}/>
              </Switch>
          </Layout> 
        </div>
      );}

}

export default App;

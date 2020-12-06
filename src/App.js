import React , { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import { auth } from './firebase';
import { useStateValue } from './State/StateProvider/StateProvider';
import Payment from './components/Payment/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import Orders from './components/Orders/Orders';

const promise = loadStripe('pk_test_51HuVcvGA308hXQPTpnS2bDEyCYQOLz2wxosXCIsVgaqWCvDMDe90Q89ibsentoHTgpouIZgsU6xfFXDIgz5vTJzs0024ZArYfR')

function App() {

  const [,dispatch]= useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      
      if(authUser){
        dispatch({
          type: 'SET USER',
          user: authUser
        })
        
      }else{
        dispatch({
          type: 'SET USER',
          user: null
        })
        
      }
    })
  }, [dispatch])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Header/>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/checkout'>
            <Header/>
            <Checkout/>
          </Route>
          <Route exact path='/orders'>
            <Header/>
            <Orders />
          </Route>
          <Route exact path='/payment'>
            <Header/>
            <Elements stripe={promise}>
              <Payment/>  
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

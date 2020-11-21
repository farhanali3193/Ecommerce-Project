import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch, Redirect,  } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';


import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
 
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //userAuth is just the userAuth object or the Google User object.
    //   // console.log('User;', userAuth)
    //   if(userAuth){
    //     // console.log(userAuth);
    //     const userRef = await createUserProfileDocument(userAuth)
    //     userRef.onSnapshot(snapShot => { //We subscribe to userRef using onSnapshot to chck if our datbse has updated at that ref with any new data OR basically if the snapshot has changed.
    //       setCurrentUser({  // But chances are that it will never update coz we will never update the user inside the code. So the reason to use onSnapshot is that the moment it instantiates, meaning the moment this code runs,
    //           id: snapShot.id, // it will still send a snapshot obj respresenting the first state of data that is currently stored in our db as onSNapshot returns a snapshot obj.
    //           ...snapShot.data() //the doc snapshot obj also has a property called ".data()", which we can use to get the actual properties on the obj present in our db, which returns a JSON obj of the doc.
    //       })
    //     })
    //   } else {
    //       setCurrentUser(userAuth);
    //   }
    // })
    const { checkUserSession } = this.props;
    checkUserSession()
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header />
        <Switch>   
          <Route exact path='/' component = {HomePage} />
          <Route path='/shop' component = {ShopPage} />
          <Route exact path='/checkout' component = {CheckoutPage} />
          <Route exact path='/signin' render = {() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />) } />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';

import Master from './containers/Master'
import App from './containers/App'
import Fireadmin from './containers/Fireadmin'
import Firestoreadmin from './containers/Firestoreadmin'
import Push from './containers/Push'
import User from './containers/User'
import HomeMaster from './containers/HomeMaster'

import { Router, Route,hashHistory} from 'react-router'

class Admin extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route component={HomeMaster} >
          {/* make them children of `Home Master` */}
          <Route path="/account" component={User}></Route>
        </Route>
        <Route component={Master} >
            {/* make them children of `Master` */}
            <Route path={"/"} component={App}></Route>
            <Route path="/app" component={App}/>
            <Route path="/push" component={Push}/>

            <Route path="/fireadmin" loadedPath="/fireadmin/" hideHamburger={false} component={Fireadmin}/>
            <Route path="/fireadmin/:sub" loadedPath="/fireadmin/" hideHamburger={false} component={Fireadmin}/>
      
            <Route path="/firestoreadmin" component={Firestoreadmin}/>
            <Route path="/firestoreadmin/:sub" component={Firestoreadmin}/>
      </Route>
    </Router>
    );

   } 
  }


export default Admin;

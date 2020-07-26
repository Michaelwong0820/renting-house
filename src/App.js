import React from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

//导入Login组件
import Login from './components/login/login'
import Layout from './components/layout/layout'
import List from './components/list/list'
import NotFound from './components/NotFound/404'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/layout' component={Layout}/>
          <List path='/list/:house_type/:name' component={List}/>
          <Redirect exact from='/' to='/login'/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;

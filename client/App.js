import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Form from './components/Form';
import DataTable from './components/DataTable';
import FundList from './components/FundList';

import './style.scss';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/home" component={Form} />
            <Route path="/fundList" component={FundList} />
            <Route path="/datatable/:id" component={DataTable} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
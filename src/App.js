import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom'; // User HashRouter instead of BrowserRouter for Github Pages
import { Provider } from './context';

import Header from './components/layout/Header';
import ContactList from './components/contacts/ContactList';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import About from './components/pages/About';
import NoPage404 from './components/pages/404';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="cManager"/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={ContactList}/>
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={NoPage404}/>
              </Switch>
            </div>
            </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;

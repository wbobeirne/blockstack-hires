import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ReduxState } from './ducks';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'libs/history';
import Template from './components/Template';
import Home from './pages/Home';
import FourOhFour from './pages/FourOhFour';
import './App.scss';

interface Props {
  store: Store<ReduxState>;
};

export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
          <Router history={history}>
            <Template>
              <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route component={FourOhFour} />
              </Switch>
            </Template>
          </Router>
      </Provider>
    );
  }
}

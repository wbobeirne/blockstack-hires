import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReduxState, persistor } from './ducks';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'libs/history';
import Template from './components/Template';
import AuthedRoute from './components/AuthedRoute';
import Splash from './pages/Splash';
import EditResume from './pages/EditResume';
import Resume from './pages/Resume';
import FourOhFour from './pages/FourOhFour';
import './App.scss';

interface Props {
  store: Store<ReduxState>;
};

export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <Template>
              <Switch>
                <Route path="/" component={Splash} exact={true} />
                <AuthedRoute path="/edit" component={EditResume} exact={true} />
                <AuthedRoute path="/preview" component={Resume} exact={true} />
                <Route path="/resume/:username" component={Resume} />
                <Route component={FourOhFour} />
              </Switch>
            </Template>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

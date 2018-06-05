import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { ReduxState } from 'ducks';
import { getIsLoggingIn, getUser } from 'ducks/user/selectors';

interface StateProps {
  user: ReturnType<typeof getUser>;
  isLoggingIn: ReturnType<typeof getIsLoggingIn>;
}

type Props = RouteProps & StateProps;

class AuthedRoute extends React.Component<Props> {
  public render() {
    const { isLoggingIn, user, ...routeProps } = this.props;

    if (isLoggingIn) {
      return <Loader size="massive" content="Loading..."/>;
    }
    else if (user) {
      return <Route {...routeProps}/>;
    }
    else {
      return <Redirect to="/"/>;
    }
  }
}

export default connect((state: ReduxState) => ({
  user: getUser(state),
  isLoggingIn: getIsLoggingIn(state),
}))(AuthedRoute);

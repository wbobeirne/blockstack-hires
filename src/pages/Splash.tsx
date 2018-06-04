import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { login } from 'ducks/blockstack/actions';
import { getIsLoggingIn, getUser } from 'ducks/blockstack/selectors';
import { ReduxState } from 'ducks';
import './Splash.scss';

interface StateProps {
  user: ReturnType<typeof getUser>;
  isLoggingIn: ReturnType<typeof getIsLoggingIn>;
}

interface ActionProps {
  login: typeof login;
}

type Props = StateProps & ActionProps;

class Splash extends React.Component<Props> {
  public render() {
    const { user, isLoggingIn } = this.props;

    if (user) {
      return <Redirect to="/home"/>
    }

    return (
      <div className="Splash">
        <h2 className="Splash-tag">Connect to more than your node</h2>
        <p className="Splash-description">
          Meet people and make connections
        </p>
        <Button
          primary
          className="Splash-start"
          size="huge"
          loading={isLoggingIn}
          onClick={this.props.login}
        >
          Get Started
        </Button>
      </div>
    );
  }
}

export default connect((state: ReduxState) => ({
  user: getUser(state),
  isLoggingIn: getIsLoggingIn(state)
}), {
  login
})(Splash);

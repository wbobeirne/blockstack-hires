import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { login } from 'ducks/user/actions';
import { getIsLoggingIn, getUser } from 'ducks/user/selectors';
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
      return <Redirect to="/edit"/>
    }

    return (
      <div className="Splash">
        <h2 className="Splash-tag">Quick, Professional Resumes</h2>
        <p className="Splash-description">
          Create a beautiful resume in minutes. No need for an account, just
          start building.
        </p>
        <Button
          primary
          className="Splash-start"
          size="huge"
          loading={isLoggingIn}
          onClick={this.props.login}
        >
          Make a Resume
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

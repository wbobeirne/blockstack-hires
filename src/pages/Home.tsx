import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from 'ducks/blockstack/selectors';
import { ReduxState } from 'ducks';
import './Home.scss';

interface StateProps {
  user: ReturnType<typeof getUser>;
}

type Props = StateProps;

class Home extends React.Component<Props> {
  public render() {
    const { user } = this.props;

    if (!user) {
      return <Redirect to="/"/>;
    }

    return (
      <div className="Home">
        <h1>Hello, {user.profile.name || 'Stranger'}</h1>
      </div>
    );
  }
}

export default connect((state: ReduxState) => ({
  user: getUser(state)
}))(Home);

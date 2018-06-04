import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { logout } from 'ducks/blockstack/actions';
import { getUser } from 'ducks/blockstack/selectors';
import { ReduxState } from 'ducks';
import './Header.scss';

interface StateProps {
  user: ReturnType<typeof getUser>;
}

interface ActionProps {
  logout: typeof logout;
}

type Props = StateProps & ActionProps;

class Header extends React.Component<Props> {
  public render() {
    const { user } = this.props;

    return (
      <header className="Header">
        <div className="Header-logo">
          BlockPeopleMeet
        </div>
        {user &&
          <button className="Header-logout" onClick={this.props.logout}>
            Log Out <Icon name="log out"/>
          </button>
        }
      </header>
    );
  }
};

export default connect((state: ReduxState) => ({
  user: getUser(state)
}), {
  logout
})(Header);

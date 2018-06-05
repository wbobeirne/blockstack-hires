import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { logout, login } from 'ducks/user/actions';
import { getUser } from 'ducks/user/selectors';
import { ReduxState } from 'ducks';
import Logo from 'assets/logo.svg';
import './Header.scss';

interface StateProps {
  user: ReturnType<typeof getUser>;
}

interface ActionProps {
  login: typeof login;
  logout: typeof logout;
}

type Props = StateProps & ActionProps;

class Header extends React.Component<Props> {
  public render() {
    const { user } = this.props;

    return (
      <header className="Header">
        <Link className="Header-logo" to="/">
          <img className="Header-logo-img" src={Logo}/>
        </Link>
        {user ? (
          <button className="Header-button" onClick={this.props.logout}>
            Sign out <Icon name="log out"/>
          </button>
        ) : (
          <button className="Header-button" onClick={this.props.login}>
            Sign in <Icon name="user circle"/>
          </button>
        )}
      </header>
    );
  }
};

export default connect((state: ReduxState) => ({
  user: getUser(state)
}), {
  logout,
  login,
})(Header);

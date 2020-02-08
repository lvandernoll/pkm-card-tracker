import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAuthenticated } from 'auth';
import { logout } from 'actions/user';

// Styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import styles from './App.module.scss';

// Pages
import SetListPage from 'pages/setList';
import SetCardsPage from 'pages/setCards';
import LoginPage from 'pages/login';
import ChangePasswordPage from 'pages/changePassword';

// Components
import Sidebar from 'react-sidebar';
import Menu from 'components/menu';

// Set up components with authentication
const Login = withRouter(userIsNotAuthenticatedRedir(LoginPage));
const SetList = withRouter(userIsAuthenticatedRedir(SetListPage));
const SetCards = withRouter(userIsAuthenticatedRedir(SetCardsPage));
const ChangePassword = withRouter(userIsAuthenticatedRedir(ChangePasswordPage));
const MenuIcon = userIsAuthenticated(() => <FontAwesomeIcon className={styles.headerIcon} icon={faBars} />);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  onSetSidebarOpen = open => this.setState({ sidebarOpen: open });

  render = () =>
    <Router className={styles.app}>
      <Sidebar
        sidebar={<Menu closeMenu={() => this.onSetSidebarOpen(false)} />}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        pullRight={true}
        styles={{ sidebar: { background: "white" } }}>
        <div className={styles.app}>
          <header className={styles.header}>
            <Link to='/'><h1>Pokémon Card Tracker</h1></Link>
            <div onClick={() => this.onSetSidebarOpen(true)}><MenuIcon /></div>
          </header>
          <main className={styles.main}>
            <Switch>
              <Route exact path='/set/:set'>
                <SetCards />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/change-password'>
                <ChangePassword />
              </Route>
              <Route path='/'>
                <SetList />
              </Route>
            </Switch>
          </main>
          <footer className={styles.footer} />
        </div>
      </Sidebar>
    </Router>;
}
export default connect(state => ({ user: state.user }), { logout })(App);

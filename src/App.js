import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAuthenticated } from 'auth';
import { logout } from 'actions/user';

// Styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import styles from './App.module.scss';

// Pages
import SetListPage from 'pages/setList';
import SetCardsPage from 'pages/setCards';
import LoginPage from 'pages/login';

// Set up components with authentication
const Login = withRouter(userIsNotAuthenticatedRedir(LoginPage));
const SetList = withRouter(userIsAuthenticatedRedir(SetListPage));
const SetCards = withRouter(userIsAuthenticatedRedir(SetCardsPage));
const LogoutLink = userIsAuthenticated(({ logout }) => <FontAwesomeIcon className={styles.headerIcon} icon={faUser} onClick={() => logout()} />);

const App = ({ logout }) =>
  <Router className={styles.app}>
    <div className={styles.app}>
      <header className={styles.header}>
        <Link to='/'><h1>Pokémon Card Tracker</h1></Link>
        <LogoutLink logout={logout} />
      </header>
      <main className={styles.main}>
        <Switch>
          <Route exact path='/set/:set'>
            <SetCards />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            <SetList />
          </Route>
        </Switch>
      </main>
      <footer className={styles.footer} />
    </div>
  </Router>;

export default connect(state => ({ user: state.user }), { logout })(App);

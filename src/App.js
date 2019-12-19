import React from 'react';
import { BrowserRouter, Switch, Route, Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout } from 'actions/user';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, userIsNotAuthenticated } from 'auth';

import SetListPage from 'pages/setList';
import SetCardsPage from 'pages/setCards';
import LoginPage from 'pages/login';
import styles from './App.module.scss';

const Login = withRouter(userIsNotAuthenticatedRedir(LoginPage));
const SetList = withRouter(userIsAuthenticatedRedir(SetListPage));
const SetCards = withRouter(userIsAuthenticatedRedir(SetCardsPage));

const getUserName = user => user.data ? user.data.name : null;

const LoginLink = userIsNotAuthenticated(() => <Link to='/login'><FontAwesomeIcon className={styles.headerIcon} icon={faUser} /></Link>);
const LogoutLink = userIsAuthenticated(({ logout }) => <a href='#' onClick={() => logout()}><FontAwesomeIcon className={styles.headerIcon} icon={faUser} /></a>);

const App = ({user, logout}) =>
  <BrowserRouter className={styles.app}>
    <div className={styles.app}>
      <header className={styles.header}>
        <Link to='/'><h1>Pokémon Card Tracker</h1></Link>
        <LoginLink />
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
  </BrowserRouter>;

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { logout })(App);

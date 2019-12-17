import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SetListPage from 'pages/setList';
import SetCardsPage from 'pages/setCards';
import LoginPage from 'pages/login';
import Header from 'components/header';
import styles from './App.module.scss';

const App = props =>
  <BrowserRouter className={styles.app}>
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route exact path='/set/:set'>
            <SetCardsPage />
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route path='/'>
            <SetListPage />
          </Route>
        </Switch>
      </main>
      <footer className={styles.footer} />
    </div>
  </BrowserRouter>;

export default App;

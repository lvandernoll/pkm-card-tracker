import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SetListPage from 'pages/setList';
import SetCardsPage from 'pages/setCards';
import styles from './App.module.css';

const App = () =>
  <BrowserRouter className={styles.app}>
    <div className={styles.app}>
      <header className={styles.header}>
        Header
      </header>
      <main className={styles.main}>
        <Switch>
          <Route exact path='/:set'>
            <SetCardsPage />
          </Route>
          <Route path='/'>
            <SetListPage />
          </Route>
        </Switch>
      </main>
      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  </BrowserRouter>;

export default App;

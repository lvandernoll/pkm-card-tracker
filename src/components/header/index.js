import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.scss';

const Header = props =>
  <header className={styles.header}>
    <Link to='/'><h1>Pokémon Card Tracker</h1></Link>
    {props.location.pathname !== '/login' && <Link to='/login'><FontAwesomeIcon className={styles.headerIcon} icon={faUser} /></Link>}
  </header>

export default withRouter(Header);
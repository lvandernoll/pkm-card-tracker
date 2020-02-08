import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import styles from './menu.module.scss';

class Menu extends Component {
  onNavClick = fn => {
    this.props.closeMenu();
    fn();
  }

  render = () =>
    <nav className={styles.menu}>
      <ul>
        <li className={styles.menuItem} onClick={this.props.closeMenu}>
          <Link to='/change-password'>
            <FontAwesomeIcon className={styles.menuIcon} icon={faKey} />
            <span>Change Password</span>
          </Link>
        </li>
        <li className={styles.menuItem} onClick={() => this.onNavClick(this.props.logout)}>
          <FontAwesomeIcon className={styles.menuIcon} icon={faSignOutAlt} />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
}

export default connect(null, { logout })(Menu);

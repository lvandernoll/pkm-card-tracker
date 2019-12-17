import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import form from 'styles/form.module.scss';
import styles from './login.module.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unmaskIcon: faEye,
    };
  }

  unmaskPassword = e => {
    const input = this.refs.input;
    if(!input.hasAttribute("readonly")) {
      e.currentTarget.classList.toggle("active");
      if(input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        this.setState({ unmaskIcon: faEyeSlash });
      } else {
        input.setAttribute("type", "password");
        this.setState({ unmaskIcon: faEye });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render = () =>
    <form onSubmit={this.onSubmit} className={styles.wrapper}>
      <h2>Login</h2>
      <label className={form.inputWrapper} htmlFor='username'>
        <span className={form.label}>Username</span>
        <input ref='input' type='text' id='username' />
      </label>
      <label className={form.inputWrapper} htmlFor='password'>
        <span className={form.label}>Wachtwoord</span>
        <input ref='input' type='password' id='password' data-type='password' />
        <i onClick={this.unmaskPassword} className={form.passwordUnmask}>
          <FontAwesomeIcon className={form.passwordUnmaskIcon} icon={this.state.unmaskIcon} />
        </i>
      </label>
      <button type='submit'>Verstuur</button>
    </form>
};

export default LoginPage;

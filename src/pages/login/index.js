import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { loggingIn, login, logout } from 'actions/user';
import form from 'styles/form.module.scss';
import styles from './login.module.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unmaskIcon: faEye,
      name: '',
      password: '',
    };
  }

  unmaskPassword = e => {
    const input = this.refs.password;
    if(!input.hasAttribute('readonly')) {
      e.currentTarget.classList.toggle('active');
      if(input.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text');
        this.setState({ unmaskIcon: faEyeSlash });
      } else {
        input.setAttribute('type', 'password');
        this.setState({ unmaskIcon: faEye });
      }
    }
  }

  onChange = e => this.setState({ [e.currentTarget.id]: e.currentTarget.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, password } = this.state;
    this.props.loggingIn();
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
    .then(response => response.json().then(responseJson => {
      if(response.status === 200) this.props.login(responseJson);
      else {
        console.error(responseJson);
        this.props.logout();
      }
    }))
    .catch(e => {
      console.error(e);
      this.props.logout();
    });
  }

  render = () =>
    <form onSubmit={this.onSubmit} className={styles.wrapper}>
      <h2>Login</h2>
      <label className={form.inputWrapper} htmlFor='name'>
        <span className={form.label}>Name</span>
        <input type='text' id='name' value={this.state.name} onChange={this.onChange} />
      </label>
      <label className={form.inputWrapper} htmlFor='password'>
        <span className={form.label}>Wachtwoord</span>
        <input type='password' id='password' data-type='password' value={this.state.password} onChange={this.onChange} />
        <i onClick={this.unmaskPassword} className={form.passwordUnmask}>
          <FontAwesomeIcon className={form.passwordUnmaskIcon} icon={this.state.unmaskIcon} />
        </i>
      </label>
      <button type='submit'>Verstuur</button>
    </form>
};

export default connect(null, { loggingIn, login, logout })(LoginPage);

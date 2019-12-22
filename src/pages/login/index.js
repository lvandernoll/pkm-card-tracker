import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { login } from 'actions/user';
import Button from 'components/button';
import form from 'styles/form.module.scss';
import styles from './login.module.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unmaskIcon: faEye,
      name: '',
      password: '',
      isLoading: false,
      incorrectForm: false,
      systemError: false,
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

  onChange = e => this.setState({ [e.currentTarget.id]: e.currentTarget.value, incorrectForm: false });

  onSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { name, password } = this.state;
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
        this.setState({ incorrectForm: true });
        console.error(responseJson);
      }
      this.setState({ isLoading: false });
    }))
    .catch(e => {
      console.error(e);
      this.setState({ isLoading: false, systemError: true });
    });
  }

  render = () =>
    <form onSubmit={this.onSubmit} className={styles.wrapper}>
      <h2>Login</h2>
      <label className={form.inputWrapper} htmlFor='name'>
        <span className={form.label}>Name</span>
        <input type='text' id='name' value={this.state.name} required onChange={this.onChange} className={this.state.incorrectForm ? form.error : ''} />
      </label>
      <label className={form.inputWrapper} htmlFor='password'>
        <span className={form.label}>Wachtwoord</span>
        <input type='password' id='password' data-type='password' value={this.state.password} required onChange={this.onChange} className={this.state.incorrectForm ? form.error : ''} />
        <i onClick={this.unmaskPassword} className={form.passwordUnmask}>
          <FontAwesomeIcon className={form.passwordUnmaskIcon} icon={this.state.unmaskIcon} />
        </i>
      </label>
      {this.state.incorrectForm && <span className={form.errorLabel}>Incorrecte inloggegevens</span>}
      {this.state.systemError && <span className={form.errorLabel}>Er is een systeemfout opgetreden</span>}
      <Button type='submit' isLoading={this.state.isLoading}>Verstuur</Button>
    </form>
};

export default connect(null, { login })(LoginPage);

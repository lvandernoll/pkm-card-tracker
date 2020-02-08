import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/button';
import form from 'styles/form.module.scss';
import styles from './changePassword.module.scss';

class ChangePasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPasswordUnmaskIcon: faEye,
      passwordUnmaskIcon: faEye,
      confirmPasswordUnmaskIcon: faEye,
      currentPassword: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      incorrectForm: false,
      systemError: false,
      errorMessage: 'Incorrecte gegevens',
      completed: false,
    };
  }

  unmaskPassword = e => {
    const input = e.currentTarget.parentNode.querySelector('[data-type=password');
    if(input && !input.hasAttribute('readonly')) {
      e.currentTarget.classList.toggle('active');
      if(input.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text');
        this.setState({ [`${input.id}UnmaskIcon`]: faEyeSlash });
      } else {
        input.setAttribute('type', 'password');
        this.setState({ [`${input.id}UnmaskIcon`]: faEye });
      }
    }
  }

  onChange = e => this.setState({ [e.currentTarget.id]: e.currentTarget.value, incorrectForm: false });

  onSubmit = e => {
    e.preventDefault();
    const { currentPassword, password, confirmPassword } = this.state;
    if(password !== confirmPassword) {
      this.setState({ incorrectForm: true, errorMessage: 'Wachtwoorden ongelijk' });
      return;
    }
    this.setState({ isLoading: true });
    fetch(`${process.env.REACT_APP_API_URL}/user/change-password/`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.data.token}`,
      },
      body: JSON.stringify({ password }),
    })
    .then(response => response.text().then(responseText => {
      if(response.status === 204) {
        this.setState({ isLoading: false, completed: true });
      }
      else {
        this.setState({ incorrectForm: true, errorMessage: 'Incorrecte gegevens', isLoading: false });
        console.error(responseText);
      }
    }))
    .catch(e => {
      console.error(e);
      this.setState({ isLoading: false, systemError: true });
    });
  }

  render = () =>
    <form onSubmit={this.onSubmit} className={styles.wrapper}>
      <h2>Change Password</h2>
      {/* <label className={form.inputWrapper} htmlFor='currentPassword'>
        <span className={form.label}>Huidig wachtwoord</span>
        <input type='password' id='currentPassword' data-type='password' value={this.state.currentPassword} required onChange={this.onChange} className={this.state.incorrectForm ? form.error : ''} />
        <i onClick={this.unmaskPassword} className={form.passwordUnmask}>
          <FontAwesomeIcon className={form.passwordUnmaskIcon} icon={this.state.currentPasswordUnmaskIcon} />
        </i>
      </label> */}
      <label className={form.inputWrapper} htmlFor='password'>
        <span className={form.label}>Nieuw wachtwoord</span>
        <input type='password' id='password' data-type='password' value={this.state.password} required onChange={this.onChange} className={this.state.incorrectForm ? form.error : ''} />
        <i onClick={this.unmaskPassword} className={form.passwordUnmask}>
          <FontAwesomeIcon className={form.passwordUnmaskIcon} icon={this.state.passwordUnmaskIcon} />
        </i>
      </label>
      <label className={form.inputWrapper} htmlFor='confirmPassword'>
        <span className={form.label}>Herhaal nieuw wachtwoord</span>
        <input type='password' id='confirmPassword' data-type='password' value={this.state.confirmPassword} required onChange={this.onChange} className={this.state.incorrectForm ? form.error : ''} />
        <i onClick={this.unmaskPassword} className={form.passwordUnmask}>
          <FontAwesomeIcon className={form.passwordUnmaskIcon} icon={this.state.confirmPasswordUnmaskIcon} />
        </i>
      </label>
      {this.state.incorrectForm && <span className={form.errorLabel}>{this.state.errorMessage}</span>}
      {this.state.systemError && <span className={form.errorLabel}>Er is een systeemfout opgetreden</span>}
      {this.state.completed && <span className={form.successLabel}>Wachtwoord is gewijzigd</span>}
      <Button type='submit' isLoading={this.state.isLoading}>Verstuur</Button>
    </form>
};

export default connect(state => ({ user: state.user }))(ChangePasswordPage);

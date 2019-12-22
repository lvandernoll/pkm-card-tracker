import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export class Button extends Component {
  render = () =>
    <button {...this.props}>
      {this.props.isLoading ? <FontAwesomeIcon icon={faSpinner} /> : this.props.children}
    </button>
}

export default Button;

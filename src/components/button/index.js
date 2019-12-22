import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Button = props =>
  <button type={props.type || 'button'}>
    {props.isLoading ? <FontAwesomeIcon icon={faSpinner} /> : props.children}
  </button>

export default Button;

import * as constants from '../constants';

export const login = user => dispatch => {
  dispatch({
    type: constants.USER_LOGGED_IN,
    payload: user
  });
};

export function logout() {
  return {
    type: constants.USER_LOGGED_OUT
  }
};

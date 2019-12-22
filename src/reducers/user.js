import * as constants from '../constants';
import { user as initialState } from '../initialStates';

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.USER_LOGGED_IN:
      return { data: payload };
    case constants.USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
};

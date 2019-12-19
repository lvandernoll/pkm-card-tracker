import * as constants from '../constants';
import { user as initialState } from '../initialStates';

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.USER_LOGGING_IN:
      return { ...initialState, isLoading: true };
    case constants.USER_LOGGED_IN:
      return { data: payload, isLoading: false };
    case constants.USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
};
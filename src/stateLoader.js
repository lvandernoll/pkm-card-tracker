import * as initialState from './initialStates';

export default class StateLoader {
  loadState = () => {
    try {
      let serializedState = localStorage.getItem("http://contoso.com:state");
      if(serializedState === null) return initialState;
      return JSON.parse(serializedState);
    } catch (err) {
      return initialState;
    }
  }

  saveState = state => {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("http://contoso.com:state", serializedState);
    } catch(err) {}
  }

  initializeState = () => initialState;
};

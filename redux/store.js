import { createStore, combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  // theme: themeReducer
});

const store = createStore(rootReducer);

export default store;

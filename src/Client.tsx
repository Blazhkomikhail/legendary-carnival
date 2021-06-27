import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App';
import { createStore } from 'redux';
import modeReducer from './reducers/mode';
import { Provider } from 'react-redux';

const store = createStore(
  modeReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );


ReactDOM.render(
<Provider store={store}>
  <App /> 
</Provider>,
document.getElementById('root'))
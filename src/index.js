import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './CSS/General.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import allReducers from './redux/reducers';

const store = createStore(allReducers, applyMiddleware(thunk));
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
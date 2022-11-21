import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'

import stores from './reducers/stores';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={stores}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);


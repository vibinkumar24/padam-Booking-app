import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './Dashboard';
import SearchMovies from './SearchMovies';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard/>
  </React.StrictMode>
);


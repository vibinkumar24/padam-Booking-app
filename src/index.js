import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.css';
import Theaters from './Theaters';
import AdminLogin from './AdminLogin';
import AdminEdit from './AdminEdit';
import Seat from './Seat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}> </Route>
        <Route path="/movie/:id/:title" element={<Theaters />}> </Route>
        <Route path="/admin-login" element={<AdminLogin />}> </Route>
        <Route path="/admin-edit" element={<AdminEdit />}> </Route>
        <Route path="/seat" element={<Seat />}> </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


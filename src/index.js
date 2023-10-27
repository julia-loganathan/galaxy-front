import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './core/context/AuthContext';


import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,

);




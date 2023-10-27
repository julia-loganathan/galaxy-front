import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DestinationDetail from './core/components/DestinationDetail';
import HomePage from './core/pages/HomePage';
import SignupPage from './core/pages/SignupPage';
import LoginPage from './core/pages/LoginPage';
import Header from './core/components/layout/Header';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/destination/:id" element={<DestinationDetail />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>

    </div>

  );
}

export default App;

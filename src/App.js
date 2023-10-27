import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DestinationDetail from './core/components/DestinationDetail';
import HomePage from './core/pages/HomePage';
import SignupPage from './core/pages/SignupPage';
import LoginPage from './core/pages/LoginPage';
import Header from './core/components/layout/Header';
import NotFound from './core/pages/NotFound';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/destination/:id" element={<DestinationDetail />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" replace />} />

      </Routes>

    </div>

  );
}

export default App;

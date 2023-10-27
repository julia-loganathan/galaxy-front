import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DestinationDetail from './core/components/DestinationDetail';
import HomePage from './core/pages/HomePage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/destination/:id" element={<DestinationDetail />} />

      </Routes>

    </div>

  );
}

export default App;

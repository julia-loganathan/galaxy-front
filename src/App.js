import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './core/pages/HomePage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />

      </Routes>

    </div>

  );
}

export default App;

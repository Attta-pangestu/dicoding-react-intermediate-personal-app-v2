import React from 'react';
import {Route, Routes} from 'react-router-dom';

// Components 
import Navigation from './components/Navigation';

// pages
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="app-container">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path='/'  element={<HomePage />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;

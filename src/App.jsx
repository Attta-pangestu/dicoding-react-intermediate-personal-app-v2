import React from 'react';
import {Route, Routes} from 'react-router-dom';

// Components 
import Navigation from './components/Navigation';

// pages
import HomePageWrapper from './pages/HomePage';
import DetailPageWrapper from './pages/DetailPage';
import AddPagesWrapper from './pages/AddNewPages';
import ArchivePagesWrapper from './pages/ArchivePages';
import EditPagesWrapper from './pages/EditPage';

function App() {
  return (
    <div className="app-container">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path='/'  element={<HomePageWrapper />}/>
          <Route path='/notes/:id'  element={<DetailPageWrapper />}/>
          <Route path='/notes/edit/:noteId'  element={<EditPagesWrapper />}/>
          <Route path='/notes/new'  element={<AddPagesWrapper />}/>
          <Route path='/arsip' element={<ArchivePagesWrapper />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;

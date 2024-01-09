import React from 'react';
import {Route, Routes} from 'react-router-dom';

// Components 
import Navigation from './components/Navigation';
import ButtonActions from './components/ButtonActions';
import {FiSun} from 'react-icons/fi'

// pages
import HomePageWrapper from './pages/HomePage';
import DetailPageWrapper from './pages/DetailPage';
import AddPagesWrapper from './pages/AddNewPages';
import ArchivePagesWrapper from './pages/ArchivePages';
import EditPagesWrapper from './pages/EditPage';


class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      theme : "" 
    }
    this.onClickToogleTheme = this.onClickToogleTheme.bind(this);
  }

  onClickToogleTheme () {
    this.state.theme === 'light' ? this.setState({theme: ''}) : this.setState({theme:'light'}) ; 
  }

  render () {
    return (
      <div className="app-container" data-theme={this.state.theme}>
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
          <div className='toogle-wrap toogle-theme'>
              <ButtonActions icon={<FiSun />} tooltipe={"ganti tema"} onClick={this.onClickToogleTheme}/>
          </div>
      </div>
    );

  }
}

export default App;

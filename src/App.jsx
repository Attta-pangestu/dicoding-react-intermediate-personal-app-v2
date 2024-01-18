import React from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

// utils
import { getUserLoggedIn} from './utils/networkData';
import ThemeContext from './context/themeContext';

// Components 
import Navigation from './components/Navigation';

// pages
import HomePageWrapper from './pages/HomePage';
import DetailPageWrapper from './pages/DetailPage';
import AddPagesWrapper from './pages/AddNewPages';
import ArchivePagesWrapper from './pages/ArchivePages';
import EditPagesWrapper from './pages/EditPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App () {
  const [theme, setTheme] = React.useState('');
  const [authedUsers, setAuthedUsers] = React.useState(false);
  const navigate = useNavigate();
  const toggleTheme = () => { theme === 'light' ? setTheme('') : setTheme('light') }; 

  const ThemeContext = {
    theme,
    toggleTheme, 
  };
  
  

  const successLoginHandler = (error) => {
    setAuthedUsers(!error);
  }

  
  

  React.useEffect(() => {
      getUserLoggedIn().then( ({error, id, name, email}) => {
        if(error) {
          alert("Silahkan Login Terlebih Dulu");
          navigate('/login');
        } else{
          setAuthedUsers(true);
          console.log({name, email, id })
        }
      }); 
  }, []);

  // Event Handler
  const onClickToogleTheme = () => {
    theme === 'light' ? setTheme('') : setTheme('light'); 
  }

  
  return (
    <ThemeContext.Provider value={ThemeContext}>
      <div className="app-container" data-theme={theme}>
        <header>
          <Navigation onClickToogleTheme={onClickToogleTheme}/>
        </header>
        <main>
          {authedUsers === true ? 
            <Routes>
            <Route path='/'  element={<HomePageWrapper />}/>
            <Route path='/notes/:id'  element={<DetailPageWrapper />}/>
            <Route path='/notes/edit/:noteId'  element={<EditPagesWrapper />}/>
            <Route path='/notes/new'  element={<AddPagesWrapper />}/>
            <Route path='/arsip' element={<ArchivePagesWrapper />}/>
            <Route path='*' element={<NotFoundPage />}/>
            </Routes>
            :
            <Routes>
                <Route path='*' element={<LoginPage successLoginHandler={successLoginHandler}/>}/>
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        }
        
        </main>
          
      </div>
    </ThemeContext.Provider>
  );
  
}


export default App;

import React from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

// utils
import { getUserLoggedIn,  logout} from './utils/networkData';

// Context
import ThemeContext from './context/themeContext';
import LocaleContext from './context/localeContext';

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
  // context
  const [locale, setLocale] = React.useState('id');
  const [theme, setTheme] = React.useState('');
  const toggleLocale = () => locale === 'id' ? setLocale('en') : setLocale('id') ; 
  const toggleTheme = () => { theme === 'light' ? setTheme('') : setTheme('light') }; 
  
  // state
  const [iniatingCancel, setIniatingCancel] = React.useState(true);

  // auth
  const [authedUsers, setAuthedUsers] = React.useState({error : true});
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = React.useState(false);
  const localeContext = {
    locale,
    toggleLocale,
  }

  const themeContext = {
    theme,
    toggleTheme, 
  };
  
  const logoutHandler = () => {
    logout();
    setAuthStatus(false);
    
  }

  const successLoginHandler = () => {
    setAuthStatus(true)
  }

  
  React.useEffect(() => {
      getUserLoggedIn().then( ({error, id, name, email}) => {
        if(error) {
          alert("Silahkan Login Terlebih Dulu");
          setIniatingCancel(false);
          navigate('/login');
        } else{
          setAuthedUsers({error, id, name, email});
          setIniatingCancel(false);
          setAuthStatus(true);
        }
      }); 
  }, []);

  if(iniatingCancel) {
    return null ; 
  }

  return (
    <LocaleContext.Provider value={localeContext}>
      <ThemeContext.Provider value={themeContext}>
          <div className="app-container" data-theme={theme}>
            <header>
              <Navigation authedStatus={authStatus}  name={authedUsers.name} onLogoutHandler={logoutHandler} />
            </header>
            <main>
              {authStatus  ? 
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
    </LocaleContext.Provider>
    
  );
  
}


export default App;

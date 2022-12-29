import './App.css';
import Navigation from './components/navigation';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { ToastProvider } from 'react-toast-notifications';
import {Routes, Route, redirect} from 'react-router-dom'
import LogIn from './components/login';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Project from './components/projects';
import PrivateLoggedInRoutes from './components/PrivateRoutes/PrivateLoggedInRoutes';
import PrivateLoggedOutRoutes from './components/PrivateRoutes/PrivateLoggedOutRoutes';
import ProjectOverview from './components/projectView';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Events from './components/events';
import NotFound from './components/404';


const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#000056",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#B88F01',
    },
  },
});


function App() {

  const navigate = useNavigate()
  const location = useLocation()

  const user = localStorage.getItem('user')

  if(!user){
    localStorage.setItem('user', null)
  }


  const redirect = () => {
    if(location.pathname === '/'){
      navigate('/login')
    }else{
      navigate(location.pathname)
    }
  }


  useEffect(() => {
    redirect()
  }, [location.pathname])


  return (
    <>
    <Toaster></Toaster>
    <ThemeProvider theme={theme}>
      <ToastProvider>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<PrivateLoggedInRoutes><LogIn/></PrivateLoggedInRoutes>}></Route>
        <Route path="/signup" element={<PrivateLoggedInRoutes><SignUp/></PrivateLoggedInRoutes>}></Route>
        <Route path="/projects" element={<PrivateLoggedOutRoutes><Project/></PrivateLoggedOutRoutes>}></Route>
        <Route path='/events' element={<PrivateLoggedOutRoutes><Events/></PrivateLoggedOutRoutes>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path="/projects/:projectId" element={<PrivateLoggedOutRoutes><ProjectOverview/></PrivateLoggedOutRoutes>}></Route>
      </Routes>
      </ToastProvider>
    </ThemeProvider>
    </>

  );
}

export default App;

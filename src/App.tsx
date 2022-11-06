import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './components/views/HomeView';
import LoginView from './components/views/LoginView';
import NotFoundView from './components/views/NotFoundView';
import PrivateRouter from './components/views/PrivateRoute';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginView />} />
            <Route path='/login' element={<LoginView />} />
            <Route path='/home' element={
              <PrivateRouter>
                <HomeView />
              </PrivateRouter>
            } />
            <Route path='*' element={<NotFoundView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App;

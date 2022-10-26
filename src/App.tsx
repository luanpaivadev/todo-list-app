import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeView from "./views/HomeView";
import LoginView from './views/LoginView';
import NotFoundView from './views/NotFoundView';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'      element={<LoginView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/home'  element={<HomeView />} />
          <Route path='*'      element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

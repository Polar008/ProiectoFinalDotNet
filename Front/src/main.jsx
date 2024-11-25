import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import './index.css'
import NavBar from './components/elements/NavBar.jsx';
import Profile from './components/pages/Profile.jsx';
import PointShop from './components/pages/PointShop.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SerchBar from './components/elements/SerchBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SerchBar />
    <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/pointShop' element={<PointShop />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

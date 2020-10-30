import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home/Home';
import './App.css';
import { UserStorage } from './Contexts/UserContext';
import Login from './Components/Home/Login/Login';
function App() {
  return (
    <div className={`container`}>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="login/*" element={<Login />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;

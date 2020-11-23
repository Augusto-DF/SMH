import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import { UserStorage } from './Contexts/UserContext';
import Login from './Components/Home/Login/Login';
import Admin from './Components/Home/Admin/Admin';
import User from './Components/Home/User/User';
function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="conta/admin/*" element={<Admin />} />
            <Route path="conta/user/*" element={<User />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;

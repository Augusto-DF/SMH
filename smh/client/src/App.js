import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home/Home';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/*">
          <Home />
        </Route>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

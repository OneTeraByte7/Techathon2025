import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/landingPage';
import { NavBar } from './components/navBar';
import Login from './components/login.js';
import Signup from './components/signup';
import Yourdetails from './components/yourdetails';
import { Home } from './components/home.jsx';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/yourdetails" element={<Yourdetails />} />

        {/* Nested routes under Home */}
        <Route path="/home/*" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//vistas
import Home from './views/auth/Home.jsx';
import Login from './views/auth/Login.jsx';
import Register from './views/auth/Register.jsx';
import PracticanteDashboard from './views/practicante/PracticanteDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/practicante/dashboard" element={<PracticanteDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
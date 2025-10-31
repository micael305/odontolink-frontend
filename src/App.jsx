// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/auth/Home.jsx';
import Login from './views/auth/Login.jsx';
import Register from './views/auth/Register.jsx';
import PracticanteDashboard from './views/practicante/PracticanteDashboard.jsx';
import GestionTratamientos from './views/practicante/GestionarTratamientos.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/practicante/dashboard"
          element={<PracticanteDashboard />}
        />
        <Route
          path="/practicante/tratamientos"
          element={<GestionTratamientos />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
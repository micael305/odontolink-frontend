// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus vistas
import Home from './views/auth/Home.jsx';
import Login from './views/auth/Login.jsx';
import Register from './views/auth/Register.jsx';

function App() {
  return (
    // 1. Envuelve toda tu app en BrowserRouter
    <BrowserRouter>
      {/* 2. Define el área donde cambiarán las rutas */}
      <Routes>
        {/* 3. Define cada ruta individual */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
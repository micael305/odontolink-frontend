import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/auth/Home.jsx';
import Login from './views/auth/Login.jsx';
import Register from './views/auth/Register.jsx';
import PracticanteDashboard from './views/practicante/PracticanteDashboard.jsx';
import GestionTratamientos from './views/practicante/GestionarTratamientos.jsx';
import ListaPacientes from './views/practicante/ListaPacientes.jsx';
import EvolucionClinica from './views/practicante/EvolucionClinica.jsx';
import HistorialAtenciones from './views/practicante/HistorialAtenciones.jsx';
import MiPerfil from './views/practicante/MiPerfil.jsx';
import GestionarTurnos from './views/practicante/GestionarTurnos.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/practicante/dashboard" element={<PracticanteDashboard />}/>
        <Route path="/practicante/tratamientos" element={<GestionTratamientos />} />
        <Route path="/practicante/pacientes" element={<ListaPacientes />} />
        <Route path="/practicante/evolucion/:pacienteId" element={<EvolucionClinica />}/>
        <Route path="/practicante/historial" element={<HistorialAtenciones />}/>
        <Route path="/practicante/perfil" element={<MiPerfil />} />
        <Route path="/practicante/turnos" element={<GestionarTurnos />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Routes, Route,HashRouter } from 'react-router-dom';
import Home from './views/auth/Home.jsx';
import Login from './views/auth/Login.jsx';
import Register from './views/auth/Register.jsx';
// Vistas de Practicante
import PracticanteDashboard from './views/practicante/PracticanteDashboard.jsx';
import GestionTratamientos from './views/practicante/GestionarTratamientos.jsx';
import ListaPacientes from './views/practicante/ListaPacientes.jsx';
import EvolucionClinica from './views/practicante/EvolucionClinica.jsx';
import HistorialAtenciones from './views/practicante/HistorialAtenciones.jsx';
import MiPerfil from './views/practicante/MiPerfil.jsx';
import GestionarTurnos from './views/practicante/GestionarTurnos.jsx';
// Vistas de Paciente
import PacienteDashboard from './views/paciente/PacienteDashboard.jsx';
import MiFeedback from './views/paciente/MiFeedback.jsx';
import ListarTratamientos from './views/paciente/ListarTratamientos.jsx';
import ReservarTurno from './views/paciente/ReservarTurno.jsx';

function App() {
  return (
    <HashRouter>
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
        <Route path="/paciente/dashboard" element={<PacienteDashboard />}/>
        <Route path="/paciente/feedback" element={<MiFeedback />} />
        <Route path="/paciente/tratamientos" element={<ListarTratamientos />} />
        <Route path="/paciente/reservar-turno/:tratamientoId" element={<ReservarTurno />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
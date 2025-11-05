import { Routes, Route,HashRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
// Vistas de Autenticación
import Home from './views/auth/Home.jsx';
import Login from './views/auth/Login.jsx';
import RegisterPatient from './views/auth/RegisterPatient.jsx';
import RegisterPractitioner from './views/auth/RegisterPractitioner.jsx';
import RegisterSupervisor from './views/auth/RegisterSupervisor.jsx';
// Vistas de Practicante
import PracticanteDashboard from './views/practicante/PracticanteDashboard.jsx';
import GestionTratamientos from './views/practicante/GestionarTratamientos.jsx';
import ListaAtenciones from './views/practicante/ListaAtenciones.jsx';
import EvolucionClinica from './views/practicante/EvolucionClinica.jsx';
import HistorialAtencionesPracticante from './views/practicante/HistorialAtencionesPracticante.jsx';
import MiPerfil from './views/practicante/MiPerfil.jsx';
import GestionarTurnos from './views/practicante/GestionarTurnos.jsx';
import MiFeedbackPracticante from './views/practicante/MiFeedbackPracticante.jsx';
// Vistas de Paciente
import PacienteDashboard from './views/paciente/PacienteDashboard.jsx';
import MiFeedback from './views/paciente/MiFeedback.jsx';
import ListarTratamientos from './views/paciente/ListarTratamientos.jsx';
import ReservarTurno from './views/paciente/ReservarTurno.jsx';
import HistorialAtencionesPaciente from './views/paciente/HistorialAtencionesPaciente.jsx';
import TurnoConfirmado from './views/paciente/TurnoConfirmado.jsx';
// Vistas de Docente
import DocenteDashboard from './views/docente/DocenteDashboard.jsx';
import ListaPracticantes from './views/docente/ListaPracticantes.jsx';
import BuscarPracticantes from './views/docente/BuscarPracticantes.jsx';
import VerFeedbackPracticante from './views/docente/VerFeedbackPracticante.jsx';
//vista de chat
import ChatLayout from './views/chat/ChatLayout.jsx';


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/register/practitioner" element={<RegisterPractitioner />}/>
        <Route path="/register/supervisor" element={<RegisterSupervisor />}/>
        {/* Practicante - Rutas de protegidas */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_PRACTITIONER']} />}>
        <Route path="/practicante/dashboard" element={<PracticanteDashboard />}/>
        <Route path="/practicante/tratamientos" element={<GestionTratamientos />} />
        <Route path="/practicante/pacientes" element={<ListaAtenciones />} />
        <Route path="/practicante/evolucion/:attentionId" element={<EvolucionClinica />}/>
        <Route path="/practicante/historial" element={<HistorialAtencionesPracticante />}/>
        <Route path="/practicante/perfil" element={<MiPerfil />} />
        <Route path="/practicante/turnos" element={<GestionarTurnos />}/>
        <Route path="/practicante/feedback" element={<MiFeedbackPracticante />} />
        </Route>
        {/* Paciente - Rutas de protegidas */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_PATIENT']} />}>
        <Route path="/paciente/dashboard" element={<PacienteDashboard />}/>
        <Route path="/paciente/feedback" element={<MiFeedback />} />
        <Route path="/paciente/tratamientos" element={<ListarTratamientos />} />
        <Route path="/paciente/reservar-turno/:tratamientoId" element={<ReservarTurno />} />
        <Route path="/paciente/historial" element={<HistorialAtencionesPaciente />} />
        <Route path="/paciente/turno-confirmado" element={<TurnoConfirmado />} />
        </Route>
        {/* Docente - Rutas de protegidas */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_SUPERVISOR']} />}>
        <Route path="/docente/dashboard" element={<DocenteDashboard />} />
        <Route path="/docente/practicantes" element={<ListaPracticantes />} />
        <Route path="/docente/buscar-practicantes" element={<BuscarPracticantes />} />
        <Route path="/docente/practicante/feedback/:practicanteId" element={<VerFeedbackPracticante />} />
        </Route>
        {/* Rutas Compartidas - Protegidas */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_PRACTITIONER', 'ROLE_PATIENT']}/>}>
        <Route path="/chat" element={<ChatLayout />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
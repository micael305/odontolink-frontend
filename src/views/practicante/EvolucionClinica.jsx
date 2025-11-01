import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './practicante.css';
import {
  FiChevronLeft,
  FiUser,
  FiBriefcase,
  FiPlus,   
  FiFileText,
} from 'react-icons/fi';

// --- Datos de prueba ---
const DUMMY_PACIENTES_DATA = {
  p1: {
    nombre: 'Maria Gonzalez',
    dni: '12.345.678',
    edad: 45,
    telefono: '11 1234-5678',
    email: 'maria@email.com',
    tratamiento: 'Tratamiento de Conducto',
    sesiones: '2 de 4',
    inicio: '14/01/2024',
    proximoTurno: '24/01/2024 - 14:30',
  },
  p2: {
    nombre: 'Juan Pérez',
    dni: '23.456.789',
    edad: 30,
    telefono: '11 2345-6789',
    email: 'juan@email.com',
    tratamiento: 'Blanqueamiento',
    sesiones: '1 de 1',
    inicio: '20/01/2024',
    proximoTurno: 'N/A',
  },
  p3: {
    nombre: 'Ana Fernandez',
    dni: '34.567.890',
    edad: 52,
    telefono: '11 3456-7890',
    email: 'ana@email.com',
    tratamiento: 'Implante Dental',
    sesiones: '1 de 3',
    inicio: '15/01/2024',
    proximoTurno: '30/01/2024 - 10:00',
  },
};

const DUMMY_EVOLUCIONES = [
  {
    id: 'e1',
    fecha: '19/01/2024',
    hora: '10:15',
    practicante: 'Juan Pérez',
    badge: 1,
    texto:
      'Segunda sesión. Instrumentación y conformación de conductos. Se observa buena respuesta al tratamiento. Sin dolor post-operatorio reportado por el paciente.',
  },
  {
    id: 'e2',
    fecha: '14/01/2024',
    hora: '14:30',
    practicante: 'Juan Pérez',
    badge: 2,
    texto:
      'Primera sesión. Se realizo apertura cameral y localización de conductos. Paciente tolera bien el procedimiento. Se coloca medicación intraconducto y obturación temporal.',
  },
];
// --- Fin de datos de prueba ---

const EvolucionClinica = () => {
  const { pacienteId } = useParams();
  const paciente = DUMMY_PACIENTES_DATA[pacienteId] || DUMMY_PACIENTES_DATA.p1;

  return (
    <div className="page-container">
      <div className="practicante-content-container evolucion">
        <header className="page-header">
          <Link to="/practicante/pacientes" className="page-back-link">
            <FiChevronLeft />
            Volver a Pacientes
          </Link>
          <h1>Evolución Clínica</h1>
        </header>

        <div className="evolucion-layout">
          <aside className="evolucion-sidebar">
            <div className="info-card">
              <h2 className="info-card-header">
                <FiUser />
                Datos del Paciente
              </h2>
              <div className="info-card-content">
                <div className="info-key-value">
                  <span className="key">Nombre completo</span>
                  <span className="value">{paciente.nombre}</span>
                </div>
                <div className="info-key-value">
                  <span className="key">DNI</span>
                  <span className="value">{paciente.dni}</span>
                </div>
                <div className="info-key-value">
                  <span className="key">Edad</span>
                  <span className="value">{paciente.edad} años</span>
                </div>
                <div className="info-key-value">
                  <span className="key">Teléfono</span>
                  <span className="value">{paciente.telefono}</span>
                </div>
                <div className="info-key-value">
                  <span className="key">Email</span>
                  <span className="value">{paciente.email}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h2 className="info-card-header">
                <FiBriefcase />
                Tratamiento Actual
              </h2>
              <div className="info-card-content">
                <div className="info-key-value">
                  <span className="key">Tratamiento</span>
                  <span className="value">{paciente.tratamiento}</span>
                </div>
                <div className="info-key-value">
                  <span className="key">Sesiones</span>
                  <span className="value">{paciente.sesiones}</span>
                </div>
                <div className="info-key-value">
                  <span className="key">Inicio</span>
                  <span className="value">{paciente.inicio}</span>
                </div>
                <div className="info-key-value">
                  <span className="key">Próximo turno</span>
                  <span className="value">{paciente.proximoTurno}</span>
                </div>
                <span className="tag-en-progreso">En progreso</span>
              </div>
            </div>
          </aside>

          <main className="evolucion-main">
            <div className="nueva-evolucion-card">
              <h3>Nueva Evolución</h3>
              <Button variant="success" icon={<FiPlus />}>
                Agregar
              </Button>
            </div>

            <div className="historial-evoluciones-card">
              <h2 className="info-card-header">
                <FiFileText />
                Historial de Evoluciones ({DUMMY_EVOLUCIONES.length})
              </h2>
              <p className="historial-subtitulo">
                Registro cronológico de todas las atenciones
              </p>

              <div className="historial-list">
                {DUMMY_EVOLUCIONES.map((ev) => (
                  <div key={ev.id} className="evolucion-item">
                    <div className="evolucion-item-badge">
                      <span>{ev.badge}</span>
                    </div>
                    <div className="evolucion-item-content">
                      <div className="evolucion-item-header">
                        <span className="fecha">
                          {ev.fecha} <span className="hora">{ev.hora}</span>
                        </span>
                        <span className="practicante">{ev.practicante}</span>
                      </div>
                      <p className="evolucion-item-body">{ev.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EvolucionClinica;
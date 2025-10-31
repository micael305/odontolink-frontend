import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TratamientoCard from '../../components/TratamientoCard/TratamientoCard';
import './practicante.css';
import { FiPlus, FiChevronLeft } from 'react-icons/fi';

const GestionTratamientos = () => {
  const tratamientos = [
  {
    id: 't1',
    titulo: 'Limpieza Dental',
    tags: [
      { texto: 'Preventivo', tipo: 'preventivo' },
      { texto: '45 minutos', tipo: 'duration' },
    ],
    disponibilidad: ['Lunes', 'Martes', 'Miércoles', 'Viernes'],
    horarios: ['09:00', '11:00', '14:00', '16:00'],
    requerimientos: 'Paciente debe venir en ayunas',
  },
  {
    id: 't2',
    titulo: 'Blanqueamiento Dental',
    tags: [
      { texto: 'Estética', tipo: 'estetica' }, 
      { texto: '60 minutos', tipo: 'duration' },
    ],
    disponibilidad: ['Lunes', 'Miércoles'],
    horarios: ['10:00', '15:00'],
    requerimientos: 'No requiere preparación previa.',
  },
  {
    id: 't3',
    titulo: 'Tratamiento de Caries',
    tags: [
      { texto: 'Restauración', tipo: 'restauracion' }, 
      { texto: '50 minutos', tipo: 'duration' },
    ],
    disponibilidad: ['Martes', 'Viernes'],
    horarios: ['09:00', '11:00', '14:00', '16:00', '17:00'],
    requerimientos: 'Evitar comer 1 hora antes.',
  },
];

  const handleModificar = () => {
    console.log('Modificar tratamiento:', tratamientos.titulo);
  };

  const handleEliminar = () => {
    console.log('Eliminar tratamiento:', tratamientos.titulo);
  };

  return (
   <div className="page-container">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <Button
            variant="success"
            icon={<FiPlus />}
            className="add-treatment-btn"
          >
            Agregar Tratamiento
          </Button>
        </header>

        <section className="treatment-list">
          <h2 className="treatment-list-header">
            Tratamientos que ofrezco ({tratamientos.length})
          </h2>

          {tratamientos.map((tratamiento) => (
            <TratamientoCard
              key={tratamiento.id}
              tratamiento={tratamiento}
              onModificar={() => handleModificar(tratamiento.id)}
              onEliminar={() => handleEliminar(tratamiento.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default GestionTratamientos;
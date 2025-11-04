import api from './api';

export const getAvailableTreatments = async () => {
  try {
    const response = await api.get('/patient/offered-treatments');
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener tratamientos disponibles:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar tratamientos'
    );
  }
};

export const getAvailableSlotsForTreatment = async (
  offeredTreatmentId,
  date
) => {
  try {
    const response = await api.get(
      `/patient/offered-treatments/${offeredTreatmentId}/availability`,
      { params: { date } }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener horarios:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar horarios'
    );
  }
};

export const scheduleAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/patient/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error(
      'Error al reservar turno:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || 'Error al reservar turno');
  }
};
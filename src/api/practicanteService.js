import api from './api';

export const getOfferedTreatments = async () => {
  try {
    const response = await api.get('/practitioner/offered-treatments');
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener tratamientos ofrecidos:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar tratamientos'
    );
  }
};

export const deleteOfferedTreatment = async (offeredTreatmentId) => {
  try {
    const response = await api.delete(
      `/practitioner/offered-treatments/${offeredTreatmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error al eliminar tratamiento:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al eliminar tratamiento'
    );
  }
};

export const getMasterTreatments = async () => {
  try {
    const response = await api.get('/treatments');
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener el catálogo maestro de tratamientos:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar el catálogo'
    );
  }
};

export const addOfferedTreatment = async (treatmentData) => {
  try {
    const response = await api.post(
      '/practitioner/offered-treatments',
      treatmentData
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error al agregar tratamiento:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al agregar tratamiento'
    );
  }
};

export const updateOfferedTreatment = async (id, treatmentData) => {
  try {
    const response = await api.put(
      `/practitioner/offered-treatments/${id}`,
      treatmentData
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error al actualizar tratamiento:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al actualizar tratamiento'
    );
  }
};

export const getUpcomingAppointments = async () => {
  try {
    const response = await api.get('/practitioner/appointments/upcoming');
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener próximos turnos:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar turnos'
    );
  }
};

export const markAppointmentAsCompleted = async (appointmentId) => {
  try {
    const response = await api.post(
      `/practitioner/appointments/${appointmentId}/complete`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error al completar turno:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al completar turno'
    );
  }
};

export const markAppointmentAsNoShow = async (appointmentId) => {
  try {
    const response = await api.post(
      `/practitioner/appointments/${appointmentId}/no-show`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error al marcar no asistencia:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al marcar no asistencia'
    );
  }
};
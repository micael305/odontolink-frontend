import api from './api';

/**
 * Obtiene la lista de tratamientos ofrecidos POR el practicante autenticado.
 * GET /api/practitioner/offered-treatments
 */
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

/**
 * Elimina un tratamiento del catálogo del practicante.
 * DELETE /api/practitioner/offered-treatments/{id}
 */
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
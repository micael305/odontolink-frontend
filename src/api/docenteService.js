import api from './api';

/**
 * Buscar practicantes en el sistema por nombre, DNI o legajo
 * Si no se proporciona query, retorna todos los practicantes disponibles
 * @param {string} query - Término de búsqueda (opcional)
 * @returns {Promise} Lista de practicantes encontrados
 */
export const searchPractitioners = async (query = '') => {
  try {
    const params = query ? { query } : {};
    const response = await api.get('/supervisors/practitioners/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error al buscar practicantes:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al buscar practicantes');
  }
};

/**
 * Obtener la lista de practicantes que el supervisor tiene a su cargo
 * @returns {Promise} Lista de practicantes a cargo
 */
export const getMyPractitioners = async () => {
  try {
    const response = await api.get('/supervisors/my-practitioners');
    return response.data;
  } catch (error) {
    console.error('Error al obtener practicantes a cargo:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener practicantes');
  }
};

/**
 * Vincular un practicante a la lista del supervisor
 * @param {number} practitionerId - ID del practicante a vincular
 * @returns {Promise} Respuesta de la vinculación
 */
export const linkPractitioner = async (practitionerId) => {
  try {
    const response = await api.post(`/supervisors/my-practitioners/${practitionerId}`);
    return response.data;
  } catch (error) {
    console.error('Error al vincular practicante:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al vincular practicante');
  }
};

/**
 * Desvincular un practicante de la lista del supervisor
 * @param {number} practitionerId - ID del practicante a desvincular
 * @returns {Promise} Respuesta de la desvinculación
 */
export const unlinkPractitioner = async (practitionerId) => {
  try {
    const response = await api.delete(`/supervisors/my-practitioners/${practitionerId}`);
    return response.data;
  } catch (error) {
    console.error('Error al desvincular practicante:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al desvincular practicante');
  }
};

/**
 * Vincular múltiples practicantes a la lista del supervisor (operación batch)
 * @param {number[]} practitionerIds - Array de IDs de practicantes a vincular
 * @returns {Promise} Respuesta de la vinculación batch
 */
export const linkMultiplePractitioners = async (practitionerIds) => {
  try {
    const response = await api.post('/supervisors/my-practitioners/batch', { practitionerIds });
    return response.data;
  } catch (error) {
    console.error('Error al vincular múltiples practicantes:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al vincular practicantes');
  }
};

/**
 * Obtener el feedback de un practicante específico
 * @param {number} practitionerId - ID del practicante
 * @returns {Promise} Lista de feedback del practicante
 */
export const getFeedbackForPractitioner = async (practitionerId) => {
  try {
    const response = await api.get(`/supervisor/feedback/practitioner/${practitionerId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener feedback del practicante:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener feedback');
  }
};

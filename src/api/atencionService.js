import api from './api';

export const getMyAttentions = async () => {
  try {
    const response = await api.get('/practitioner/attentions');
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener atenciones:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar atenciones'
    );
  }
};

export const getAttentionById = async (attentionId) => {
  try {
    const response = await api.get(`/attentions/${attentionId}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener detalle de atención:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar detalle'
    );
  }
};

export const getProgressNotes = async (attentionId) => {
  try {
    const response = await api.get(`/attentions/${attentionId}/progress-notes`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener notas de progreso:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar notas'
    );
  }
};

export const createFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error(
      'Error al enviar feedback:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al enviar feedback'
    );
  }
};

export const addProgressNote = async (attentionId, content) => {
  try {
    const response = await api.post(
      `/attentions/${attentionId}/progress-notes`,
      { content }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error al agregar nota de progreso:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al guardar la nota'
    );
  }
};

export const finalizeAttention = async (attentionId) => {
  try {
    const response = await api.post(`/attentions/${attentionId}/finalize`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al finalizar la atención:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al finalizar la atención'
    );
  }
};

export const getFeedbackForAttention = async (attentionId) => {
  try {
    const response = await api.get(`/feedback/attention/${attentionId}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener feedback:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al cargar feedback'
    );
  }
};
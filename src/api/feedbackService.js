import api from './api';

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
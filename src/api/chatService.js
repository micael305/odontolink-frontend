import api from './api';

/**
 * Obtener todas las sesiones de chat
 */
export const getChatSessions = async () => {
  const response = await api.get('/chat/sessions');
  return response.data;
};

/**
 * Obtener mensajes de una sesión específica
 */
export const getChatMessages = async (sessionId) => {
  const response = await api.get(`/chat/sessions/${sessionId}/messages`);
  return response.data;
};

/**
 * Enviar un mensaje en una sesión
 */
export const sendChatMessage = async (sessionId, content) => {
  const response = await api.post(`/chat/sessions/${sessionId}/messages`, {
    content,
  });
  return response.data;
};

import { create } from 'zustand';
import { getChatSessions, getChatMessages, sendChatMessage } from '../api/chatService';

export const useChatStore = create((set, get) => ({
  // Estado
  sessions: [],
  currentSessionId: null,
  messages: [],
  status: 'idle', // idle | loading | success | error
  error: null,

  // Obtener todas las sesiones de chat
  fetchChatSessions: async () => {
    set({ status: 'loading', error: null });
    try {
      const sessions = await getChatSessions();
      set({ sessions, status: 'success' });
    } catch (error) {
      set({
        status: 'error',
        error: error.response?.data?.message || 'Error al cargar las sesiones',
      });
    }
  },

  // Seleccionar una sesión y cargar sus mensajes
  selectSession: async (sessionId) => {
    set({ currentSessionId: sessionId, status: 'loading', error: null });
    try {
      const messages = await getChatMessages(sessionId);
      set({ messages, status: 'success' });
    } catch (error) {
      set({
        status: 'error',
        error: error.response?.data?.message || 'Error al cargar los mensajes',
      });
    }
  },

  // Enviar un mensaje
  sendMessage: async (content) => {
    const { currentSessionId } = get();
    if (!currentSessionId) {
      set({ error: 'No hay sesión seleccionada' });
      return;
    }

    try {
      const newMessage = await sendChatMessage(currentSessionId, content);
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al enviar el mensaje',
      });
      throw error;
    }
  },

  // Limpiar errores
  clearError: () => set({ error: null }),

  // Reset
  reset: () =>
    set({
      sessions: [],
      currentSessionId: null,
      messages: [],
      status: 'idle',
      error: null,
    }),
}));

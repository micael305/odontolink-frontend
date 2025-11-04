import { create } from 'zustand';
import {
  getMyAttentions,
  getAttentionById,
  getProgressNotes,
  createFeedback,
  addProgressNote,
  finalizeAttention,
  getFeedbackForAttention,
} from '../api/atencionService';

export const useAtencionStore = create((set) => ({
  attentions: [],
  currentAttention: null,
  progressNotes: [],
  status: 'idle',
  error: null,

  fetchPractitionerAttentions: async () => {
    set({ status: 'loading', error: null });
    try {
      const attentions = await getMyAttentions();

      const attentionsWithFeedback = await Promise.all(
        attentions.map(async (att) => {
          if (att.status === 'COMPLETED') {
            try {
              const feedback = await getFeedbackForAttention(att.id);
              return { ...att, feedback: feedback || [] };
            } catch {
              return { ...att, feedback: [] };
            }
          }
          return { ...att, feedback: [] };
        })
      );

      set({ attentions: attentionsWithFeedback, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  fetchAttentionDetails: async (attentionId) => {
    set({
      status: 'loading',
      error: null,
      currentAttention: null,
      progressNotes: [],
    });
    try {
      const attentionData = await getAttentionById(attentionId);
      const notesData = await getProgressNotes(attentionId);

      set({
        currentAttention: attentionData,
        progressNotes: notesData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        status: 'success',
      });
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  submitFeedback: async (feedbackData) => {
    set({ status: 'loading', error: null });
    try {
      const newFeedback = await createFeedback(feedbackData);
      set((state) => ({
        attentions: state.attentions.map((att) =>
          att.id === feedbackData.attentionId
            ? { ...att, feedback: [newFeedback, ...(att.feedback || [])] }
            : att
        ),
        status: 'success',
      }));
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },

  addProgressNote: async (attentionId, content) => {
    set({ status: 'loading', error: null });
    try {
      const updatedAttention = await addProgressNote(attentionId, content);
      const notesData = await getProgressNotes(attentionId);

      set((state) => ({
        currentAttention: { ...state.currentAttention, ...updatedAttention },
        progressNotes: notesData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        status: 'success',
      }));
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },

  finalizeAttention: async (attentionId) => {
    set({ status: 'loading', error: null });
    try {
      const finalizedAttention = await finalizeAttention(attentionId);
      set({ currentAttention: finalizedAttention, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },
}));
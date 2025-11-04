import { create } from 'zustand';
import {
  getMyAttentions,
  getAttentionById,
  getProgressNotes,
  createFeedback,
  addProgressNote, 
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
      const data = await getMyAttentions();
      set({ attentions: data, status: 'success' });
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
      await createFeedback(feedbackData);
      set({ status: 'success' });
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

      set({
        currentAttention: updatedAttention,
        progressNotes: notesData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        status: 'success',
      });
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },
}));
import { create } from 'zustand';
import {
  getAvailableTreatments,
  getAvailableSlotsForTreatment,
  scheduleAppointment,
} from '../api/pacienteService';

export const usePacienteStore = create((set, get) => ({
  availableTreatments: [],
  selectedTreatmentDetails: null,
  availableSlots: [],
  bookedAttention: null, 
  status: 'idle',
  error: null,

  fetchAvailableTreatments: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await getAvailableTreatments();
      set({ availableTreatments: data, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  fetchTreatmentDetails: async (offeredTreatmentId) => {
    set({ status: 'loading', error: null, selectedTreatmentDetails: null });
    let treatments = get().availableTreatments;
    if (treatments.length === 0) {
      try {
        treatments = await getAvailableTreatments();
        set({ availableTreatments: treatments });
      } catch (error) {
        set({ status: 'error', error: error.message });
        return;
      }
    }
    const treatment = treatments.find((t) => t.id == offeredTreatmentId);
    set({ selectedTreatmentDetails: treatment, status: 'success' });
  },

  fetchAvailableSlots: async (offeredTreatmentId, date) => {
    set({ status: 'loading', error: null, availableSlots: [] });
    try {
      const slots = await getAvailableSlotsForTreatment(offeredTreatmentId, date);
      set({ availableSlots: slots, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  scheduleAppointment: async (appointmentData) => {
    set({ status: 'loading', error: null });
    try {
      const data = await scheduleAppointment(appointmentData);
      set({ bookedAttention: data, status: 'success' });
      return data;
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },
}));
import { create } from 'zustand';
import {
  getOfferedTreatments,
  deleteOfferedTreatment,
  getMasterTreatments,
  addOfferedTreatment,
  updateOfferedTreatment, 
} from '../api/practicanteService';

export const useTratamientoStore = create((set) => ({
  offeredTreatments: [],
  masterTreatments: [],
  status: 'idle',
  error: null,

  fetchOfferedTreatments: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await getOfferedTreatments();
      set({ offeredTreatments: data, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  deleteOfferedTreatment: async (offeredTreatmentId) => {
    set({ status: 'loading', error: null });
    try {
      await deleteOfferedTreatment(offeredTreatmentId);
      set((state) => ({
        offeredTreatments: state.offeredTreatments.filter(
          (t) => t.id !== offeredTreatmentId
        ),
        status: 'success',
      }));
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  fetchMasterTreatments: async () => {
    try {
      const data = await getMasterTreatments();
      set({ masterTreatments: data });
    } catch (error) {
      console.error('Error al cargar master treatments:', error.message);
    }
  },

  addOfferedTreatment: async (treatmentData) => {
    set({ status: 'loading', error: null });
    try {
      const newTreatment = await addOfferedTreatment(treatmentData);
      set((state) => ({
        offeredTreatments: [...state.offeredTreatments, newTreatment],
        status: 'success',
      }));
      return newTreatment;
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },

  /**
   * actualizar un tratamiento (PUT)
   */
  updateOfferedTreatment: async (id, treatmentData) => {
    set({ status: 'loading', error: null });
    try {
      const updatedTreatment = await updateOfferedTreatment(id, treatmentData);
      
      // Actualiza la lista local
      set((state) => ({
        offeredTreatments: state.offeredTreatments.map((t) =>
          t.id === updatedTreatment.id ? updatedTreatment : t
        ),
        status: 'success',
      }));
      return updatedTreatment;
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },
}));
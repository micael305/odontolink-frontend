import { create } from 'zustand';
import {
  getOfferedTreatments,
  deleteOfferedTreatment,
} from '../api/practicanteService';

export const useTratamientoStore = create((set) => ({
  offeredTreatments: [],
  status: 'idle', 
  error: null,

  /**
   * buscar los tratamientos del practicante (GET)
   */
  fetchOfferedTreatments: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await getOfferedTreatments();
      set({ offeredTreatments: data, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  /**
   * Eliminar un tratamiento del catálogo (DELETE)
   */
  deleteOfferedTreatment: async (offeredTreatmentId) => {
    set({ status: 'loading', error: null });
    try {
      await deleteOfferedTreatment(offeredTreatmentId);
      
      // Actualiza el estado local eliminando la tarjeta
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
}));
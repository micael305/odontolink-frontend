import { create } from 'zustand';
import {
  getUpcomingAppointments,
  markAppointmentAsCompleted,
  markAppointmentAsNoShow,
} from '../api/practicanteService';

export const useTurnoStore = create((set) => ({
  turnos: [],
  status: 'idle',
  error: null,

  fetchTurnos: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await getUpcomingAppointments();
      set({ turnos: data, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error.message });
    }
  },

  updateTurnoStatus: (appointmentId, newStatus) => {
    set((state) => ({
      turnos: state.turnos.map((turno) =>
        turno.id === appointmentId ? { ...turno, status: newStatus } : turno
      ),
    }));
  },

  completeTurno: async (appointmentId) => {
    set({ status: 'loading', error: null });
    try {
      const updatedTurno = await markAppointmentAsCompleted(appointmentId);
      set((state) => ({
        turnos: state.turnos.map((t) =>
          t.id === updatedTurno.id ? updatedTurno : t
        ),
        status: 'success',
      }));
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },

  noShowTurno: async (appointmentId) => {
    set({ status: 'loading', error: null });
    try {
      const updatedTurno = await markAppointmentAsNoShow(appointmentId);
      set((state) => ({
        turnos: state.turnos.map((t) =>
          t.id === updatedTurno.id ? updatedTurno : t
        ),
        status: 'success',
      }));
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },
}));
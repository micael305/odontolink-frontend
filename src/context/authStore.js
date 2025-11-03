import { create } from 'zustand';
import {
  login as apiLogin,
  registerPatient as apiRegisterPatient,
  registerPractitioner as apiRegisterPractitioner,
} from '../api/authService';

const getInitialState = () => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      return { token, user, isAuthenticated: true };
    }
  } catch  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return {
    token: null,
    user: null,
    isAuthenticated: false,
  };
};

export const useAuthStore = create((set) => ({
  ...getInitialState(),
  status: 'idle',
  error: null,

  login: async (email, password) => {
    set({ status: 'loading', error: null });
    try {
      const data = await apiLogin(email, password);
      const { token, role, firstName, lastName, userId, email: userEmail } = data;
      const user = { role, firstName, lastName, userId, email: userEmail };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        status: 'success',
        error: null,
      });
      return data;
    } catch (error) {
      set({ status: 'error', error: error.message, isAuthenticated: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      status: 'idle',
      error: null,
    });
  },

  registerPatient: async (patientData) => {
    set({ status: 'loading', error: null });
    try {
      const data = await apiRegisterPatient(patientData);
      set({ status: 'success', error: null });
      return data;
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },

  registerPractitioner: async (practitionerData) => {
    set({ status: 'loading', error: null });
    try {
      const data = await apiRegisterPractitioner(practitionerData);
      set({ status: 'success', error: null });
      return data;
    } catch (error) {
      set({ status: 'error', error: error.message });
      throw error;
    }
  },
}));
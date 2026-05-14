import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_AUTH_TIMEOUT) || 10000,
});

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors
      .map((e) => e?.defaultMessage || e?.message || e?.field)
      .filter(Boolean)
      .join(' | ');
  }

  return fallbackMessage;
};

const sanitizeRegisterPayload = (payload) => {
  const cleaned = {};

  Object.entries(payload || {}).forEach(([key, value]) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed !== '') {
        cleaned[key] = trimmed;
      }
      return;
    }

    if (value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  });

  if (cleaned.email) {
    cleaned.email = cleaned.email.toLowerCase();
  }

  if (cleaned.phone) {
    cleaned.phone = cleaned.phone.replace(/\D/g, '');
  }

  if (cleaned.dni) {
    cleaned.dni = cleaned.dni.replace(/\D/g, '');
  }

  if (cleaned.studyYear) {
    const parsedStudyYear = Number(cleaned.studyYear);
    if (!Number.isNaN(parsedStudyYear)) {
      cleaned.studyYear = parsedStudyYear;
    }
  }

  return cleaned;
};

export const login = async (email, password) => {
  try {
    const response = await publicApi.post('/auth/login', {
      email: email?.trim(),
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error.response?.data || error.message);
    throw new Error(getApiErrorMessage(error, 'Email o contraseña incorrectos'));
  }
};

export const registerPatient = async (patientData) => {
  try {
    const response = await publicApi.post(
      '/auth/register/patient',
      sanitizeRegisterPayload(patientData)
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error en el registro de paciente:',
      error.response?.data || error.message
    );
    throw new Error(getApiErrorMessage(error, 'Error al registrarse'));
  }
};

export const registerPractitioner = async (practitionerData) => {
  try {
    const response = await publicApi.post(
      '/auth/register/practitioner',
      sanitizeRegisterPayload(practitionerData)
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error en el registro de practicante:',
      error.response?.data || error.message
    );
    throw new Error(getApiErrorMessage(error, 'Error al registrarse'));
  }
};

export const registerSupervisor = async (supervisorData) => {
  try {
    const response = await publicApi.post(
      '/supervisors/register',
      sanitizeRegisterPayload(supervisorData)
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error en el registro de supervisor:',
      error.response?.data || error.message
    );
    throw new Error(getApiErrorMessage(error, 'Error al registrarse'));
  }
};
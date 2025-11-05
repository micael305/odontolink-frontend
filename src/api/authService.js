import axios from 'axios';

const publicApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  timeout: 5000,
});

export const login = async (email, password) => {
  try {
    const response = await publicApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Email o contraseña incorrectos');
  }
};

export const registerPatient = async (patientData) => {
  try {
    const response = await publicApi.post('/register/patient', patientData);
    return response.data;
  } catch (error) {
    console.error(
      'Error en el registro de paciente:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || 'Error al registrarse');
  }
};

export const registerPractitioner = async (practitionerData) => {
  try {
    const response = await publicApi.post(
      '/register/practitioner',
      practitionerData
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error en el registro de practicante:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || 'Error al registrarse');
  }
};

export const registerSupervisor = async (supervisorData) => {
  try {
    const response = await publicApi.post('/supervisors/register', supervisorData);
    return response.data;
  } catch (error) {
    console.error(
      'Error en el registro de supervisor:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || 'Error al registrarse');
  }
};
import axios from 'axios';

const publicApi = axios.create({
  baseURL: 'https://odontolink.azurewebsites.net/api/auth',
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
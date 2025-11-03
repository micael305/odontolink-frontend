import axios from 'axios';

// para los endpoints públicos
const publicApi = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  timeout: 5000,
});

/**
 * Llama al endpoint de login.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} Datos del usuario y token (JwtResponseDTO)
 */
export const login = async (email, password) => {
  try {
    const response = await publicApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};

/**
 * Llama al endpoint de registro de paciente.
 * @param {object} patientData (RegisterPatientRequestDTO)
 * @returns {Promise<object>} Mensaje de éxito
 */
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

/**
 * Llama al endpoint de registro de practicante.
 * @param {object} practitionerData (RegisterPractitionerRequestDTO)
 * @returns {Promise<object>} Mensaje de éxito
 */
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
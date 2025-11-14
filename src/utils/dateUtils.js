/**
 * Convierte una fecha a formato ISO (YYYY-MM-DD) usando la zona horaria local
 * sin conversión a UTC, evitando problemas de cambio de día.
 * 
 * @param {Date} date - La fecha a formatear
 * @returns {string} Fecha en formato ISO (YYYY-MM-DD) en zona horaria local
 */
export const toLocalISODate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formatea una hora desde un string ISO a formato local HH:MM
 * 
 * @param {string} isoString - String ISO con fecha y hora
 * @returns {string} Hora formateada (HH:MM)
 */
export const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Parsea una fecha ISO (YYYY-MM-DD) como fecha local, evitando la conversión UTC
 * que causa que se muestre un día anterior en zonas horarias negativas.
 * 
 * @param {string} isoDateString - String de fecha en formato ISO (YYYY-MM-DD)
 * @returns {Date} Objeto Date en zona horaria local
 */
export const parseLocalDate = (isoDateString) => {
  if (!isoDateString) return null;
  const [year, month, day] = isoDateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Formatea una fecha ISO (YYYY-MM-DD) a formato local legible
 * 
 * @param {string} isoDateString - String de fecha en formato ISO (YYYY-MM-DD)
 * @param {object} options - Opciones de formato para toLocaleDateString
 * @returns {string} Fecha formateada
 */
export const formatLocalDate = (isoDateString, options = {}) => {
  const date = parseLocalDate(isoDateString);
  if (!date) return 'No especificada';
  return date.toLocaleDateString('es-ES', options);
};

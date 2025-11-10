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

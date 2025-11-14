// src/components/ProgressBar/ProgressBar.jsx
import './progressBar.css';

/**
 * ProgressBar - Componente para mostrar progreso de atenciones
 * Diseñado siguiendo principios de Material Design y mejores prácticas UI/UX
 * 
 * @param {number} current - Número actual de atenciones completadas
 * @param {number} max - Número máximo de atenciones permitidas
 * @param {boolean} compact - Modo compacto para vistas reducidas
 * @param {boolean} showPercentage - Mostrar porcentaje además de números
 * @param {string} label - Etiqueta descriptiva opcional
 */
const ProgressBar = ({ 
  current = 0, 
  max = 1, 
  compact = false, 
  showPercentage = true,
  label = 'Cupo de atenciones'
}) => {
  // Calcular porcentaje asegurando valores válidos
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  
  // Determinar estado visual según el progreso
  const getProgressStatus = () => {
    if (percentage >= 100) return 'completed';
    if (percentage >= 75) return 'high';
    if (percentage >= 50) return 'medium';
    if (percentage >= 25) return 'low';
    return 'starting';
  };

  const status = getProgressStatus();
  const remaining = max - current;

  return (
    <div className={`progress-bar-container ${compact ? 'compact' : ''}`}>
      <div className="progress-bar-header">
        <div className="progress-bar-label">
          <span className="progress-label-text">{label}</span>
          <span className="progress-numbers">
            <strong className="current-number">{current}</strong>
            <span className="separator">de</span>
            <span className="max-number">{max}</span>
          </span>
        </div>
        {showPercentage && (
          <span className={`progress-percentage ${status}`}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      {!compact && remaining > 0 && (
        <div className="progress-remaining">
          {remaining === 1 
            ? `Podés atender 1 paciente más`
            : `Podés atender ${remaining} pacientes más`
          }
        </div>
      )}
      {!compact && remaining === 0 && (
        <div className="progress-remaining completed">
          Cupo completo — Ya completaste todas las atenciones requeridas
        </div>
      )}
      <div className="progress-bar-track">
        <div 
          className={`progress-bar-fill ${status}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin="0"
          aria-valuemax={max}
          aria-label={`${current} de ${max} atenciones completadas`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

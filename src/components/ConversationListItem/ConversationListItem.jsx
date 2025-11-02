import './conversationListItem.css';
import { FiUser } from 'react-icons/fi';

const ConversationListItem = ({
  convo,
  isActive,
  onClick,
}) => {
  const avatarClass = `cl-avatar-wrapper ${
    convo.rol === 'paciente' ? 'paciente' : 'practicante'
  }`;

  return (
    <div
      className={`conversation-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className={avatarClass}>
        {convo.avatar ? (
          <img src={convo.avatar} alt={convo.nombre} />
        ) : (
          <FiUser />
        )}
      </div>
      <div className="cl-details">
        <div className="cl-name-time">
          <span className="name">{convo.nombre}</span>
          <span className="time">{convo.lastTime}</span>
        </div>
        <div className="cl-message-badge">
          <span className="message">{convo.lastMessage}</span>
          {convo.unread > 0 && (
            <span className="cl-unread-badge">{convo.unread}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
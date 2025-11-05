// src/views/chat/ChatLayout.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ConversationListItem from '../../components/ConversationListItem/ConversationListItem';
import { useChatStore } from '../../context/chatStore';
import { useAuthStore } from '../../context/authStore';
import './chatLayout.css';
import {
  FiSearch,
  FiUser,
  FiSend,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
  FiLoader,
} from 'react-icons/fi';

const ChatLayout = () => {
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const {
    sessions,
    currentSessionId,
    messages,
    status,
    fetchChatSessions,
    selectSession,
    sendMessage,
  } = useChatStore();

  const { user } = useAuthStore();

  useEffect(() => {
    fetchChatSessions();
  }, [fetchChatSessions]);

  useEffect(() => {
    if (sessions.length > 0 && !currentSessionId) {
      selectSession(sessions[0].id);
    }
  }, [sessions, currentSessionId, selectSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getOtherPersonName = (session) => {
    if (!user) return '';
    // Si soy paciente → mostrar practitionerName
    // Si soy practicante → mostrar patientName
    if (user.role === 'ROLE_PATIENT') {
      return session.practitionerName || '';
    } else if (user.role === 'ROLE_PRACTITIONER') {
      return session.patientName || '';
    }
    return '';
  };

  const selectedSession = sessions.find((s) => s.id === currentSessionId);

  const filteredSessions = sessions.filter((session) => {
    const otherPersonName = getOtherPersonName(session);
    return otherPersonName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleVolver = () => {
    navigate(-1);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    
    try {
      await sendMessage(messageText);
      setMessageText('');
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return date.toLocaleDateString('es-ES');
    }
  };

  const getLastMessage = (sessionId) => {
    if (currentSessionId === sessionId && messages.length > 0) {
      return messages[messages.length - 1].content;
    }
    return '';
  };

  return (
    <div className="chat-layout-container">
      <aside className="sidebar-panel">
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <h1>Mensajes</h1>
            <button className="chat-volver-btn" onClick={handleVolver}>
              <FiChevronLeft /> Volver
            </button>
          </div>
          <div className="sidebar-search-wrapper">
            <FiSearch />
            <input
              type="text"
              className="sidebar-search-input"
              placeholder="Buscar conversación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="conversation-list">
          {status === 'loading' && sessions.length === 0 && (
            <div className="loading-container">
              <FiLoader className="loading-icon" />
            </div>
          )}
          {filteredSessions.map((session) => {
            // Determinar el rol de la otra persona basado en mi rol
            let otherPersonRole = 'paciente';
            if (user?.role === 'ROLE_PATIENT') {
              // Soy paciente, la otra persona es practicante
              otherPersonRole = 'practicante';
            } else if (user?.role === 'ROLE_PRACTITIONER') {
              // Soy practicante, la otra persona es paciente
              otherPersonRole = 'paciente';
            }
            
            const convoData = {
              id: session.id,
              nombre: getOtherPersonName(session),
              rol: otherPersonRole,
              lastMessage: getLastMessage(session.id),
              lastTime: formatTime(session.createdAt),
              unread: 0,
            };
            return (
              <ConversationListItem
                key={session.id}
                convo={convoData}
                isActive={session.id === currentSessionId}
                onClick={() => selectSession(session.id)}
              />
            );
          })}
        </div>
      </aside>

      <main className="chat-panel">
        {selectedSession ? (
          <>
            <header className="chat-header">
              <FiUser />
              <h2>{getOtherPersonName(selectedSession)}</h2>
            </header>
            <div className="chat-messages-area">
              <div className="chat-messages-list">
                {messages.map((msg) => {
                  const isSent = user && msg.senderId === user.userId;
                  return (
                    <div
                      key={msg.id}
                      className={`message-bubble-container ${
                        isSent ? 'sent' : 'received'
                      }`}
                    >
                      <div
                        className={`message-bubble ${
                          isSent ? 'sent' : 'received'
                        }`}
                      >
                        {msg.content}
                        <div className="message-meta">
                          <span>{formatTime(msg.sentAt)}</span>
                          {isSent && <FiCheckCircle />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="chat-input-container">
              <textarea
                className="chat-input"
                placeholder="Escribe un mensaje..."
                rows="1"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
              ></textarea>
              <Button 
                variant="primary" 
                icon={<FiSend />} 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              />
            </div>
          </>
        ) : (
          <div className="chat-placeholder">
            {status === 'loading' ? (
              <div className="loading-container">
                <FiLoader className="loading-icon" />
                <p>Cargando conversaciones...</p>
              </div>
            ) : sessions.length === 0 ? (
              <p>No tienes conversaciones aún.</p>
            ) : (
              <p>Selecciona una conversación para comenzar a chatear.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatLayout;
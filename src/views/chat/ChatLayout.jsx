// src/views/chat/ChatLayout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ConversationListItem from '../../components/ConversationListItem/ConversationListItem';
import './chatLayout.css';
import {
  FiSearch,
  FiUser,
  FiSend,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
} from 'react-icons/fi';

const DUMMY_CONVERSATIONS = [
  {
    id: 'c1',
    nombre: 'Dra. María González',
    rol: 'practicante',
    lastMessage: 'Perfecto, nos vemos el 5 entonces.',
    lastTime: 'Ayer',
    unread: 0,
  },
  {
    id: 'c2',
    nombre: 'Juan Pérez',
    rol: 'paciente',
    lastMessage: 'Hola, tengo una duda sobre el postoperatorio...',
    lastTime: '1h',
    unread: 2,
  },
  {
    id: 'c3',
    nombre: 'Ana Fernández',
    rol: 'paciente',
    lastMessage: 'Muchas gracias por todo.',
    lastTime: '3d',
    unread: 0,
  },
];

const DUMMY_MESSAGES_DB = {
  c1: [
    {
      id: 'm1',
      sender: 'paciente',
      text: 'Doctora, ¿puedo tomar un analgésico?',
      time: '10:30',
    },
    {
      id: 'm2',
      sender: 'practicante',
      text: 'Hola! Sí, no hay problema. Paracetamol cada 8hs.',
      time: '10:32',
    },
    {
      id: 'm3',
      sender: 'paciente',
      text: 'Perfecto, nos vemos el 5 entonces.',
      time: '10:33',
    },
  ],
  c2: [
    {
      id: 'm4',
      sender: 'paciente',
      text: 'Hola, tengo una duda sobre el postoperatorio...',
      time: '1h',
    },
  ],
  c3: [
    {
      id: 'm5',
      sender: 'paciente',
      text: 'Muchas gracias por todo.',
      time: '3d',
    },
  ],
};

const ChatLayout = () => {
  const [selectedConvoId, setSelectedConvoId] = useState('c1');
  const navigate = useNavigate();

  const selectedConvo = DUMMY_CONVERSATIONS.find(
    (c) => c.id === selectedConvoId
  );
  const messages = DUMMY_MESSAGES_DB[selectedConvoId] || [];

  const handleVolver = () => {
    navigate(-1);
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
            />
          </div>
        </div>
        <div className="conversation-list">
          {DUMMY_CONVERSATIONS.map((convo) => (
            <ConversationListItem
              key={convo.id}
              convo={convo}
              isActive={convo.id === selectedConvoId}
              onClick={() => setSelectedConvoId(convo.id)}
            />
          ))}
        </div>
      </aside>

      <main className="chat-panel">
        {selectedConvo ? (
          <>
            <header className="chat-header">
              <FiUser />
              <h2>{selectedConvo.nombre}</h2>
            </header>
            <div className="chat-messages-area">
              <div className="chat-messages-list">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-bubble-container ${
                      msg.sender === 'paciente' ? 'sent' : 'received'
                    }`}
                  >
                    <div
                      className={`message-bubble ${
                        msg.sender === 'paciente' ? 'sent' : 'received'
                      }`}
                    >
                      {msg.text}
                      <div className="message-meta">
                        <span>{msg.time}</span>
                        {msg.sender === 'paciente' && <FiCheckCircle />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chat-input-container">
              <textarea
                className="chat-input"
                placeholder="Escribe un mensaje..."
                rows="1"
              ></textarea>
              <Button variant="primary" icon={<FiSend />} />
            </div>
          </>
        ) : (
          <div className="chat-placeholder">
            Selecciona una conversación para comenzar a chatear.
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatLayout;
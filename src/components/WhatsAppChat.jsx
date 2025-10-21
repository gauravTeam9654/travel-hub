import React from 'react';
import { WhatsappIcon } from 'react-share';
import './WhatsAppChat.css';

const WhatsAppChat = () => {
  const phoneNumber = "919654983297"; 
  const message = "Hi! I'm interested in your travel packages. Can you help me plan my trip?";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-chat-container">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-share-button"
      >
        <div className="whatsapp-chat-bubble">
          <WhatsappIcon size={32} round />
          <span className="whatsapp-text">Chat with us!</span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppChat;

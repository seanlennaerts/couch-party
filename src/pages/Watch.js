import React, { useState, useEffect } from 'react';
import { Chat, Nav } from '../components';

import * as electronAPI from '../electronAPI';

function Watch(props) {
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([]);

  // initialized listeners

  useEffect(() => {
    electronAPI.setGlobal('chat', { show: showChat });
    //split into if/else for readability
    if (showChat) {
      electronAPI.toggleTheaterView(true);
    } else {
      electronAPI.toggleTheaterView(false);
    }
  }, [showChat]);

  function handleURLChanged(url, isInPlace) {
    // TODO:
  }

  function addMessage(msg) {
    setMessages(prev => [...prev, ...[{ name: 'Sean', msg }]]);
  }

  function toggleChat() {
    setShowChat(!showChat);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Nav
        showChat={showChat}
        handleShowChat={toggleChat}
        handleURLChanged={handleURLChanged}
      />
      {showChat &&
        <Chat
          handleShowChat={toggleChat}
          addMessage={addMessage}
          messages={messages}
        />
      }
    </div>
  );
}

export { Watch };

import React, { useState } from 'react';

import styles from '../styles/Chat.module.css';
import hide from '../assets/hide.svg';
import patron from '../assets/patron.png';

function Chat({ handleShowChat, addMessage, messages }) {

  const [chatInputValue, setChatInputValue] = useState('');

  function handleSubmit(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const msg = chatInputValue.trim();
      if (msg.length > 0) {
        addMessage(msg);
      }
      setChatInputValue('');
    }
  }

  function buildMessages(messages) {
    return messages.map((message, index) =>
      <div className={styles.messageContainer} key={index}>
        <span className={styles.messageName}>{message.name}</span>:&nbsp;<span>{message.msg}</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button className='icon-button' onClick={handleShowChat}>
          <img src={hide} alt='hide chat' />
        </button>
        <h3>Chat</h3>
      </div>
      <div className={styles.body}>
        {buildMessages(messages)}
      </div>
      <div className={styles.bottom}>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.input}
            onKeyDown={handleSubmit}
            maxLength='500'
            rows='1'
            placeholder='Send a message'
            value={chatInputValue}
            onChange={e => setChatInputValue(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.patron}>
          <img src={patron} alt='become a patron' />
        </div>
      </div>
    </div>
  );
}

export { Chat };

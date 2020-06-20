import React, { useState, useEffect } from 'react';

import '../styles/Nav.css';
import chevron from '../assets/chevron.svg';
import hide from '../assets/hide.svg';

import * as electronAPI from '../electronAPI';

function Nav({ showChat, handleShowChat, handleURLChanged }) {
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(false);

  useEffect(() => {
    electronAPI.initNavigationListener(handleDidStartNavigation);
  }, []);

  function handleDidStartNavigation(url, isInPlace) {
    handleURLChanged(url, isInPlace);

    setBack(electronAPI.canGoBack());
    setForward(electronAPI.canGoForward());
  }

  return (
    <div className="nav-container">
      <div className='nav-leading'>
        <button
          className='icon-button'
          onClick={electronAPI.goBack}
          style={{ marginRight: 0 }}
          disabled={!back}
        >
          <img src={chevron} style={{ transform: 'scaleX(-1)' }} alt='back' />
        </button>
        <button
          className='icon-button'
          onClick={electronAPI.goForward}
          disabled={!forward}
        >
          <img src={chevron} alt='forward' />
        </button>
      </div>
      <div className='nav-trailing'>
        {!showChat &&
          <button className='icon-button' id='show-chat' onClick={handleShowChat}>
            <img src={hide} style={{ transform: `scaleX(-1)` }} alt='show chat' />
          </button>
        }
      </div>
    </div >
  );
}

export { Nav };

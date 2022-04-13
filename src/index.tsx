// index.ts

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainState from './context/main/MainState';

const rootElement = document.getElementById('root')
document.addEventListener('dragover', (e) => {
  e.preventDefault()
})

ReactDOM.render(
  <React.StrictMode>
    <MainState>
      <App currentUser={null}/>
    </MainState>
  </React.StrictMode>,
  rootElement
);

// END of document

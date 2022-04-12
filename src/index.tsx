// index.ts

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root')
document.addEventListener('dragover', (e) => {
  e.preventDefault()
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

// END of document

// CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectApp from './ProjectApp';

// Rendu de l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectApp />
  </React.StrictMode>
);

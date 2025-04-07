import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectApp from './ProjectApp';

// CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Rendu de l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectApp />
  </React.StrictMode>
);

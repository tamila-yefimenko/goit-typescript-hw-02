import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '../src/components/App/App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

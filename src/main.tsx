import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { ErrorBoundary } from './app/components/ErrorBoundary';
import './styles/index.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Failed to find #root element. Ensure index.html contains <div id="root"></div>');
}
createRoot(root).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

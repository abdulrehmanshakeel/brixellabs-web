import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initCrashReporting } from './utils/crashReporting';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Initialize day-one telemetry & global unhandled error interceptors
initCrashReporting();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

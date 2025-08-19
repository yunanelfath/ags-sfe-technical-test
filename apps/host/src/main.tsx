import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Catalog Shell (Host)</h1>
        <small>Vite • Standalone Module Federation • React 19</small>
      </header>
      <main style={{ marginTop: 16 }}>
        <h1>Host Application</h1>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);

import React, { useEffect, useRef } from 'react';

function LogsPanel({ logs }) {
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div style={{ width: '300px', height: '100vh', overflowY: 'auto', background: '#222', color: '#eee', padding: '10px', fontFamily: 'monospace' }}>
      <h3>Logs</h3>
      {logs.map((log, index) => (
        <div key={index} style={{ marginBottom: '5px' }}>{log}</div>
      ))}
      <div ref={logsEndRef} />
    </div>
  );
}

export default LogsPanel;

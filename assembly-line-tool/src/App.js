import React, { useState } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './utils/constants';
import SidePanel from './components/SidePanel';
import CanvasContainer from './components/CanvasContainer';
import LogsPanel from './components/LogsPanel';

function App() {
  const [currentTool, setCurrentTool] = useState(null);
  const [items, setItems] = useState([]);
  const [connections, setConnections] = useState([]);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SidePanel currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <CanvasContainer
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        items={items}
        setItems={(newItems) => {
          addLog(`Items updated: now have ${newItems.length} items`);
          setItems(newItems);
        }}
        connections={connections}
        setConnections={(newConnections) => {
          addLog(`Connections updated: now have ${newConnections.length} connections`);
          setConnections(newConnections);
        }}
        addLog={addLog}
      />
      <LogsPanel logs={logs} />
    </div>
  );
}

export default App;

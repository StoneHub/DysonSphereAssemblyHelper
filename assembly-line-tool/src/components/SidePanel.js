import React from 'react';

function SidePanel({ currentTool, setCurrentTool }) {
  return (
    <div style={{ width: '200px', padding: '10px', backgroundColor: '#f4f4f4' }}>
      <h3>Select Component</h3>
      <button onClick={() => setCurrentTool('assembler')} style={{ marginBottom: '10px' }}>
        Assembler
      </button>
      <button onClick={() => setCurrentTool('smelter')} style={{ marginBottom: '10px' }}>
        Smelter
      </button>
      <button onClick={() => setCurrentTool('oil_extractor')} style={{ marginBottom: '10px' }}>
        Oil Extractor
      </button>
      <button onClick={() => setCurrentTool('matrix_lab')} style={{ marginBottom: '10px' }}>
        Matrix Lab
      </button>
      <button onClick={() => setCurrentTool('solar_panel')} style={{ marginBottom: '10px' }}>
        Solar Panel
      </button>
      <button onClick={() => setCurrentTool('conveyor')} style={{ marginBottom: '10px' }}>
        Conveyor
      </button>
      <button onClick={() => setCurrentTool('delete')} style={{ marginBottom: '10px' }}>
        Delete
      </button>
    </div>
  );
}

export default SidePanel;

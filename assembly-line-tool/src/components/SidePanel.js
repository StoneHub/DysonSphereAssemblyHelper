import React, { useState } from 'react';
import { PRESETS } from '../utils/presets'; 
import { decodeAssembly } from '../utils/serialization'; // if needed

function SidePanel({ currentTool, setCurrentTool, onExport, onImport }) {
  const [importSeed, setImportSeed] = useState('');

  return (
    <div style={{ width: '200px', padding: '10px', backgroundColor: '#f4f4f4' }}>
      <h3>Select Component</h3>
      {['assembler', 'smelter', 'oil_extractor', 'matrix_lab', 'solar_panel', 'conveyor', 'delete'].map(tool => (
        <button 
          key={tool} 
          onClick={() => setCurrentTool(tool)} 
          style={{ marginBottom: '10px', width: '100%' }}
        >
          {tool.replace('_', ' ')}
        </button>
      ))}

      <h3>Import/Export</h3>
      <button onClick={onExport} style={{ marginBottom: '10px', width: '100%' }}>Export</button>
      <input 
        type="text" 
        value={importSeed} 
        onChange={(e) => setImportSeed(e.target.value)} 
        placeholder="Paste seed" 
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={() => onImport(importSeed)} style={{ marginBottom: '10px', width: '100%' }}>
        Import
      </button>

      <h3>Presets</h3>
      {PRESETS.length > 0 ? (
        PRESETS.map(preset => (
          <button 
            key={preset.name} 
            onClick={() => onImport(preset.seed)} 
            style={{ marginBottom: '10px', width: '100%' }}
          >
            {preset.name}
          </button>
        ))
      ) : (
        <p>No presets available</p>
      )}
    </div>
  );
}

export default SidePanel;

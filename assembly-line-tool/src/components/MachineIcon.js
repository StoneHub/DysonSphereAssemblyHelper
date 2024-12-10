import React from 'react';

function MachineIcon({ type, size }) {
  // size: width and height of the SVG
  switch (type) {
    case 'assembler':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50">
          <rect x="5" y="5" width="40" height="40" fill="#4a90e2" stroke="#333" strokeWidth="2"/>
          <line x1="10" y1="10" x2="40" y2="40" stroke="#fff" strokeWidth="2" />
          <line x1="40" y1="10" x2="10" y2="40" stroke="#fff" strokeWidth="2" />
        </svg>
      );

    case 'smelter':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50">
          <rect x="5" y="5" width="40" height="40" fill="#f5a623" stroke="#333" strokeWidth="2"/>
          <path d="M15 30 L25 10 L35 30 Z" fill="#fff" />
          <rect x="20" y="30" width="10" height="10" fill="#fff"/>
        </svg>
      );

    case 'oil_extractor':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50">
          <rect x="5" y="5" width="40" height="40" fill="#7ed321" stroke="#333" strokeWidth="2"/>
          <circle cx="25" cy="25" r="10" fill="#fff" />
          <rect x="22" y="15" width="6" height="20" fill="#333"/>
        </svg>
      );

    case 'matrix_lab':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50">
          <rect x="5" y="5" width="40" height="40" fill="#bd10e0" stroke="#333" strokeWidth="2"/>
          <circle cx="25" cy="25" r="8" fill="#fff" />
          <line x1="25" y1="17" x2="25" y2="33" stroke="#333" strokeWidth="2" />
          <line x1="17" y1="25" x2="33" y2="25" stroke="#333" strokeWidth="2" />
        </svg>
      );

    case 'solar_panel':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50">
          <rect x="5" y="5" width="40" height="40" fill="#50e3c2" stroke="#333" strokeWidth="2"/>
          <rect x="10" y="10" width="30" height="30" fill="#333" />
          <line x1="10" y1="20" x2="40" y2="20" stroke="#fff" strokeWidth="2"/>
          <line x1="10" y1="30" x2="40" y2="30" stroke="#fff" strokeWidth="2"/>
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 50 50">
          <rect x="5" y="5" width="40" height="40" fill="#ccc" stroke="#333" strokeWidth="2"/>
          <text x="50%" y="50%" fill="#333" fontSize="8" textAnchor="middle" dy=".3em">?</text>
        </svg>
      );
  }
}

export default MachineIcon;

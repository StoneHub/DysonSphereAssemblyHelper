Early Game Production Planner
Overview
The Early Game Production Planner is a visual tool designed for factory-building games like Dyson Sphere Program. It helps players prototype, visualize, and refine the production chains required for generating core early-game resources. This planner focuses on basic components crucial for producing Blue Matrices, the initial research item in the game’s technology progression.

Key Features

Presets for Production Chains: Access pre-designed setups that highlight standalone production chains, from basic smelting lines to advanced component assembly.
Blueprint Export/Import: Save current layouts as Base64-encoded blueprints. Easily share or import them back into the planner for quick iteration.
Customizable Layouts: Start from scratch or tweak existing presets. Add, remove, or rearrange machines, conveyors, and resources to fit your specific gameplay strategy.
Available Presets

Iron Ingot Production: Converts iron ore into iron ingots.
Copper Ingot Production: Transforms copper ore into copper ingots.
Magnet Production: Mines iron ore and smelts it into magnets.
Magnetic Coil Production: Uses magnets and copper ingots to produce magnetic coils.
Circuit Board Production: Combines iron and copper ingots into circuit boards.
Blue Matrix Production: Integrates circuit boards and magnetic coils to generate Blue Matrices.
How to Add or Modify Presets

Create JSON Structures:
Define items (machines) and their coordinates, input/outputs, and conveyor connections. For example:

{
  "items": [
    { "id": 1, "x": 100, "y": 300, "type": "mining_machine", "outputs": { "iron_ore": 1 } },
    { "id": 2, "x": 200, "y": 300, "type": "smelter", "inputs": { "iron_ore": 1 }, "outputs": { "iron_ingots": 1 } }
  ],
  "connections": [
    { "path": [{ "x": 125, "y": 300 }, { "x": 200, "y": 300 }] }
  ]
}
Encode as Base64:
Convert the JSON to a Base64 string using an online tool or a script.

Add to PRESETS Array:
Insert a new preset in SidePanel.js:

{
  name: 'Your Preset Name',
  seed: 'your-base64-encoded-seed'
}
Test the Preset:
Run the project, click the preset button, and confirm the layout appears as intended.

Usage Guide

Select Components: In the SidePanel, choose tools like Assemblers, Smelters, or Oil Extractors to add them to the grid.
Import/Export:
Export: Click the Export button to receive a Base64 blueprint of your current layout.
Import: Paste a Base64-encoded blueprint into the import field to recreate a saved or shared setup.
Explore Presets: Quickly load standard early-game setups for inspiration or a head start.
Adjust Layouts: Drag-and-drop machines and conveyors; hold Ctrl to place multiple machines or create conveyor joints. Visual feedback aids in snapping and aligning conveyors on the grid.
Contribution Guide

Presets: Add meaningful presets representing logical early-game progressions. Make sure prerequisites (e.g., iron ingots for circuit boards) are included.
Base64 Convention: All blueprints must be encoded before addition, ensuring consistent data handling.
Naming & Descriptions: Use clear names and descriptions to help players understand each preset’s purpose and requirements.
Project Structure & Technologies

React Components: The UI is built in React, with separate components for the side panel, canvas, machine icons, and logging panel.
Hooks & Utilities: Custom hooks manage canvas rendering, item dragging, conveyor placement, and connection updates. Utility functions handle grid snapping, path calculations, and blueprint encoding/decoding.
Modular Approach: Files are organized into logical folders (components, hooks, utils) for maintainability and scalability.
For Developers & LLM Assistants

This repository is structured to facilitate iterative development and collaboration.
The clear separation of concerns means you can easily add new machine types, improve conveyor logic, or integrate advanced optimization algorithms without affecting the core code structure.
LLM-based assistants can leverage this modular setup to quickly understand context and generate targeted improvements, refactorings, or new features. Each component and hook serves as a clear entry point for further conversation and code augmentation.
License
Released under the MIT License, encouraging open collaboration and broad use in the community.

Quick Start

Clone the repository:
git clone https://github.com/StoneHub/DysonSphereAssemblyHelper.git
cd DysonSphereAssemblyHelper
Install dependencies and run:
npm install
npm start
Open http://localhost:3000 in your browser and start planning your factory setups.

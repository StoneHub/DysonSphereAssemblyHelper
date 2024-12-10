# Early Game Production Planner

The **Early Game Production Planner** is a tool designed to aid players of factory-building games like Dyson Sphere Program in planning and visualizing early-game production setups. This project provides pre-designed and customizable production chains, allowing players to create efficient layouts and focus on generating essential components like **Blue Matrices**.

## Features

- **Presets for Production Chains**: Includes pre-built setups for common early-game recipes to kickstart your factory.
- **Blueprint Export/Import**: Export production layouts as Base64-encoded strings and re-import them into the planner.
- **Customizable Layouts**: Modify or expand presets to suit specific needs or experiment with alternative designs.
- **Interactive Drag-and-Drop Interface**: Place machines, conveyors, and nodes with intuitive controls, including snapping, crossings, and visual feedback.

---

## Available Presets

1. **Iron Ingot Production**: Smelts iron ore into iron ingots.
2. **Copper Ingot Production**: Smelts copper ore into copper ingots.
3. **Magnet Production**: Mines and smelts iron ore into magnets.
4. **Magnetic Coil Production**: Combines magnets and copper ingots into magnetic coils.
5. **Circuit Board Production**: Combines iron ingots and copper ingots into circuit boards.
6. **Blue Matrix Production**: Uses circuit boards and magnetic coils to produce Blue Matrices.

---

## Project Structure

The application is built with **React** and leverages modular components for maintainability and scalability. Key parts of the project include:

### File Structure:
```
/src
  App.js                  // Main application entry point
  /components             // All reusable UI components
    SidePanel.js          // Tool selection and preset loading
    CanvasContainer.js    // Interactive grid canvas for layouts
    GridItem.js           // Represents machines and nodes on the grid
    LogsPanel.js          // Displays user actions and logs
    MachineIcon.js        // SVG-based machine visualizations
  /hooks                  // Custom hooks for feature implementation
    useCanvas.js          // Handles canvas rendering
    useConnections.js     // Manages conveyor paths and snapping
    useDraggableItems.js  // Allows machine dragging
    useConveyorPlacement.js // Enables conveyor placement with turns and crossings
  /utils                  // Helper functions and constants
    constants.js          // Grid size, machine types, etc.
    helpers.js            // Utility functions like snapping and line detection
```

### Key Features:
- **CanvasContainer**: Centralized logic for drawing the grid, managing machines and conveyors, and handling user input.
- **SidePanel**: Provides tools for machine placement, presets, and importing/exporting blueprints.
- **Custom Hooks**: Modularize features like dragging, path creation, and dynamic rendering.
- **SVG-Based Icons**: Machines are represented by scalable and intuitive vector graphics.

---

## How to Add or Modify Presets

1. **Define JSON Structures**:
   Create a production chain with items (machines) and connections (paths).

   Example:
   ```json
   {
     "items": [
       { "id": 1, "x": 100, "y": 300, "type": "mining_machine", "outputs": { "iron_ore": 1 } },
       { "id": 2, "x": 200, "y": 300, "type": "smelter", "inputs": { "iron_ore": 1 }, "outputs": { "iron_ingots": 1 } }
     ],
     "connections": [
       { "path": [{ "x": 125, "y": 300 }, { "x": 200, "y": 300 }] }
     ]
   }
   ```

2. **Encode as Base64**:
   Convert the JSON to a Base64 string using [online tools](https://www.base64encode.org/) or programmatically.

3. **Add to the Presets Array**:
   Modify `SidePanel.js` to include your preset:
   ```javascript
   { name: 'Your Preset Name', seed: 'your-base64-encoded-seed' }
   ```

4. **Test**:
   Run the project and load your preset from the SidePanel.

---

## Usage

### Key Actions:
- **Select Components**: Use the SidePanel to choose machines like Assemblers, Smelters, or Oil Extractors.
- **Blueprint Export/Import**: Save your production layouts as Base64 strings or load them from an external source.
- **Explore Presets**: Quickly load early-game setups to experiment or build upon.
- **Custom Design**: Drag, drop, and connect machines and conveyors on a snapping grid. Create crossings, turns, and splits seamlessly.

### Controls:
- **Ctrl + Drag**: Place multiple items or create conveyor joints for complex layouts.
- **Right-Click**: Cancel conveyor placement.
- **Delete Tool**: Remove machines or conveyors with precision.

---

## Contribution Guide

### Adding New Features:
- Keep the user interface intuitive and maintain consistency with existing design.
- Leverage custom hooks and modular components for new functionalities.

### Preset Contributions:
- Ensure new presets align with early-game progression (e.g., require Iron Ingots for Circuit Boards).
- Provide meaningful names and clear Base64-encoded blueprints.

### Code Standards:
- Write clean, well-documented code.
- Use the helper functions in `utils` for snapping, pathfinding, and canvas rendering.

---

## Onboarding for AI Assistants

This project has a modular architecture with clear responsibilities split into components and hooks. Key interaction logic is in `CanvasContainer.js`, while reusable logic like snapping and rendering lives in `utils/helpers.js`. For new features:
- Start by identifying the feature’s hook (`useDraggableItems`, `useConveyorPlacement`).
- Update `CanvasContainer` for interaction logic.
- Use `MachineIcon.js` for custom machine visuals.
- Test thoroughly with logs enabled via the LogsPanel.

By following this structure, enhancements can be added while keeping the project scalable and maintainable.

---

## License

This project is licensed under the [MIT License](LICENSE), allowing for broad usage and modification with proper attribution.

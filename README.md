Early Game Production Planner
This project showcases basic setups and production chains for early-game resource generation in factory-building games like Dyson Sphere Program. It helps players visualize standalone production chains necessary to build core components, focusing on generating items needed to produce Blue Matrices.

Features
Presets for Production Chains: Provides pre-designed setups for common early-game recipes.
Blueprint Export/Import: Allows exporting production setups as Base64-encoded blueprints and importing them into the planner.
Customizable Layouts: Edit or expand presets to fit specific needs.
Available Presets
Iron Ingot Production: Smelts iron ore into iron ingots.
Copper Ingot Production: Smelts copper ore into copper ingots.
Magnet Production: Mines and smelts iron ore into magnets.
Magnetic Coil Production: Combines magnets and copper ingots into magnetic coils.
Circuit Board Production: Combines iron ingots and copper ingots into circuit boards.
Blue Matrix Production: Uses circuit boards and magnetic coils to produce Blue Matrices.
How to Add or Modify Presets
Create JSON Structures:

Define a production chain using items (machines) and connections (paths).
Example JSON for a simple setup:
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

Convert the JSON to a Base64 string using tools like Base64 Encode or programmatically.
Add to the PRESETS Array:

Add a new preset in SidePanel.js:
{
  name: 'Your Preset Name',
  seed: 'your-base64-encoded-seed'
}
Test the Preset:

Run the project and click the preset button to verify functionality.
Usage
Select Components: Use the SidePanel to select tools like Assemblers, Smelters, or Oil Extractors.
Import/Export:
Click Export to save a blueprint as a Base64 string.
Paste a Base64 string in the import field to load a blueprint.
Explore Presets: Click preset buttons to load early-game setups instantly.
Contribution Guide
Ensure new presets are logical, follow early-game progression, and include dependencies (e.g., Iron Ingots required for Circuit Boards).
Use the Base64 encoding convention for all blueprints.
Provide meaningful names and descriptions for new presets.

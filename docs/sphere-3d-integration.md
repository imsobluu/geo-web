# GISTDA Sphere 3D Layer Integration

This implementation adds comprehensive 3D layer support to the GISTDA Sphere Map component.

## Features Implemented

### 1. **Enhanced SphereMap Component**
- **3D Mode Toggle**: Enable/disable 3D rendering
- **Layer Management**: Add, remove, and toggle 3D layers
- **Terrain Support**: Add elevation/terrain data
- **Building Layers**: Display 3D building models
- **3D Tiles**: Support for Cesium 3D Tiles format

### 2. **Layer Types Supported**
- **3D Tiles**: Cesium 3D Tiles format (`.json` tilesets)
- **Buildings**: Automatically generated or OSM building data
- **Terrain**: Elevation data for realistic topography
- **Models**: Custom 3D models

### 3. **Components Created**

#### `SphereMap.tsx` (Enhanced)
```tsx
<SphereMap
  enable3D={true}
  layers={[
    {
      id: "buildings",
      type: "buildings",
      visible: true,
      style: { height: 20, color: "#4A90E2" }
    }
  ]}
  terrain={{
    url: "https://api.sphere.gistda.or.th/terrain",
    requestWaterMask: true
  }}
  tiles3D={[
    {
      id: "bangkok-tiles",
      url: "https://api.sphere.gistda.or.th/3dtiles/bangkok/tileset.json",
      maximumScreenSpaceError: 16
    }
  ]}
/>
```

#### `SphereMap3DDemo.tsx`
Complete demo showcasing all 3D features with interactive controls.

#### `Layer3DManager.tsx`
UI component for dynamic layer management with presets and custom layer addition.

## API Methods Implemented

The component tries multiple method patterns to handle different GISTDA API versions:

```typescript
// Layer management
mapInstance.addLayer?.(layerConfig)
mapInstance.removeLayer?.(layerId)
mapInstance.toggleLayer?.(layerId, visible)

// 3D specific
mapInstance.add3DTiles?.(tilesConfig)
mapInstance.addBuildings?.(buildingConfig)
mapInstance.setTerrain?.(terrainConfig)

// 3D mode
mapInstance.enable3D?.(true)
mapInstance.set3DMode?.(true)
```

## Usage Examples

### Basic 3D Map
```tsx
<SphereMap
  apiKey="your-api-key"
  enable3D={true}
  buildings={{ id: "osm-buildings", visible: true }}
/>
```

### Advanced 3D Configuration
```tsx
const layers = [
  {
    id: "custom-buildings",
    type: "3dtiles",
    url: "https://your-tiles-server.com/tileset.json",
    visible: true
  }
];

<SphereMap
  enable3D={true}
  layers={layers}
  terrain={{
    url: "https://terrain-server.com/tiles",
    requestWaterMask: true,
    requestVertexNormals: true
  }}
/>
```

### Dynamic Layer Management
```tsx
const handleAddLayer = (layer) => {
  // Layer will be automatically added to the map
  console.log("New layer added:", layer);
};

<Layer3DManager
  onAddLayer={handleAddLayer}
  onRemoveLayer={handleRemoveLayer}
  onToggleLayer={handleToggleLayer}
/>
```

## Debugging

The implementation includes extensive logging to help understand the GISTDA API:

1. **Console Logs**: Check browser console for:
   - Available map instance methods
   - Layer addition/removal status
   - 3D initialization progress

2. **Error Handling**: Graceful fallbacks if 3D methods aren't available

3. **Visual Indicators**: 
   - Map ready status with 3D indicator
   - In-map controls for layer management
   - Layer visibility toggles

## Common 3D Tile URLs (Examples)

Based on common GISTDA/Cesium patterns:
- Buildings: `https://api.sphere.gistda.or.th/3dtiles/buildings/tileset.json`
- Terrain: `https://api.sphere.gistda.or.th/terrain/tileset.json`
- Bangkok Models: `https://api.sphere.gistda.or.th/3dtiles/bangkok/tileset.json`

## Next Steps

1. **Test with Real API**: Replace example URLs with actual GISTDA endpoints
2. **Performance**: Adjust `maximumScreenSpaceError` for performance tuning
3. **Styling**: Customize building colors and materials
4. **Animation**: Add camera animations and flyTo functionality
5. **Integration**: Connect with actual data sources

The implementation is designed to be flexible and work with different versions of the GISTDA Sphere API by trying multiple method patterns and providing fallbacks.
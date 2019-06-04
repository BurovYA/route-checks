import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';

class OlLayerService {
  static createTileLayer(source) {
    return new TileLayer({
      source: source
    });
  }

  static createVectorLayer(clusterSource, styleFunction) {
    const clusterLayer = new VectorLayer({
      source: clusterSource,
      style: feature => {
        return styleFunction(feature);
      }
    });

    return clusterLayer;
  }
}

export default OlLayerService;

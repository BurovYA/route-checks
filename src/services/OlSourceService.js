import { Cluster as ClusterSource, Vector as VectorSource } from 'ol/source.js';
import XYZ from 'ol/source/XYZ.js';

class OlSourceService {
  static createXYZSource(options) {
    return new XYZ(options);
  }

  static createVectorSource(features) {
    return new VectorSource({
      features: features
    });
  }

  static createClusterSource(vectorSource, clusterDistance) {
    return new ClusterSource({
      distance: clusterDistance,
      source: vectorSource
    });
  }
}

export default OlSourceService;

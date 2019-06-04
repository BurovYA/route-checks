import { decorate, action } from 'mobx';

class OlFeatureStore {}

decorate(OlFeatureStore, {});

const olFeatureStore = new OlFeatureStore();

export default olFeatureStore;
export { OlFeatureStore };

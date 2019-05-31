import { decorate, observable, computed, action } from 'mobx';

class RouteStore {
  visible = false;

  constructor() {
    this.visible = false;
  }

  get isVisible() {
    return this.visible;
  }

  toggle() {
    this.visible = !this.visible;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}

decorate(RouteStore, {
  visible: observable,
  isVisible: computed,
  toggle: action,
  show: action,
  hide: action
});

const routeStore = new RouteStore();

export default routeStore;
export { RouteStore };

import { decorate, observable, computed, action } from 'mobx';

class LeftPanelStore {
  visible = false;
  searchValue = '';

  constructor() {
    this.visible = true;
    this.searchValue = '';
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

decorate(LeftPanelStore, {
  searchValue: observable,
  visible: observable,
  isVisible: computed,
  toggle: action,
  show: action,
  hide: action
});

const leftPanelStore = new LeftPanelStore();

export default leftPanelStore;
export { LeftPanelStore };

import { decorate, observable, action } from 'mobx';

class ToolbarStore {
  menuButtonPushed = false;
  searchValue = '';
  searchValueDelayed = '';

  constructor() {
    this.menuButtonPushed = true;
    this.searchValue = '';
    this.searchValueDelayed = '';
    this.searchValueDelayedTimeout = null;
  }

  toggle() {
    this.menuButtonPushed = !this.menuButtonPushed;
  }

  setSearchValue(value) {
    this.searchValue = value;

    if (this.searchValueDelayedTimeout) {
      clearTimeout(this.searchValueDelayedTimeout);
    }

    this.searchValueDelayedTimeout = setTimeout(() => {
      this.searchValueDelayed = value;
    }, 500);
  }
}

decorate(ToolbarStore, {
  searchValue: observable,
  searchValueDelayed: observable,
  menuButtonPushed: observable,
  setSearchValue: action,
  toggle: action
});

const toolbarStore = new ToolbarStore();

export default toolbarStore;
export { ToolbarStore };

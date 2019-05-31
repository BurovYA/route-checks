import { decorate, observable, action } from 'mobx';

class HouseStore {
  houses = [];

  constructor() {
    this.houses = [];
  }

  getHouses() {
    return this.houses;
  }

  fetch() {
    return fetch('/api/houses')
      .then(response => {
        //TODO: Обработка ошибок
        return response.json();
      })
      .then(houses => {
        this.houses = houses;
      });
  }
}

decorate(HouseStore, {
  houses: observable,
  fetch: action
});

const houseStore = new HouseStore();

export default houseStore;
export { HouseStore };

import { computed, decorate, observable, action, extendObservable } from 'mobx';

class HouseStore {
  houses = [];
  routeHouses = [];

  constructor() {
    this.houses = [];
    this.routeHouses = [];
    this.fetch();
  }

  getHouses(searchValue) {
    return this.houses.filter(house => {
      return house.zone.name.includes(searchValue);
    });
  }

  fetch() {
    return fetch('/api/houses')
      .then(response => {
        //TODO: Обработка ошибок
        return response.json();
      })
      .then(houses => {
        this.putHouses(houses);
      });
  }

  putHouses(houses) {
    let zonePallete = [
      '#f44336',
      //'#e91e63',
      '#9c27b0',
      //'#673ab7',
      '#3f51b5',
      //'#2196f3',
      '#03a9f4',
      //'#00bcd4',
      '#009688',
      //'#4caf50',
      '#8bc34a',
      //'#cddc39',
      '#ffeb3b',
      //'#ffc107',
      '#ff9800',
      //'#ff5722',
      '#795548',
      //'#9e9e9e',
      '#607d8b'
    ];
    let zoneColors = {};

    let houseArray = [];
    houses.forEach(house => {
      house.indexInRoute = -1;
      const zoneName = house.zone.name;
      if (!zoneColors[zoneName]) {
        zoneColors[zoneName] = zonePallete.pop() || '#607d8b';
      }
      house.zoneColor = zoneColors[zoneName];

      houseArray.push(observable(house));
    });
    this.houses = houseArray;
  }

  addHouseToRoute(house) {
    if (this.routeHouses.includes(house)) {
      return;
    }
    house.indexInRoute = this.routeHouses.length;
    this.routeHouses.push(house);
  }

  removeHouseFromRoute(house) {
    if (
      house.indexInRoute !== -1 &&
      house.indexInRoute < this.routeHouses.length
    ) {
      this.routeHouses.splice(house.indexInRoute, 1);

      //Изменение индексов в маршруте для следующих дальше домов
      for (let i = house.indexInRoute; i < this.routeHouses.length; ++i) {
        this.routeHouses[i].indexInRoute = i;
      }

      house.indexInRoute = -1;
    }
  }
}

decorate(HouseStore, {
  houses: observable,
  routeHouses: observable,
  fetch: action,
  putHouses: action,
  addHouseToRoute: action,
  removeHouseFromRoute: action,
  getHouses: action
});

const houseStore = new HouseStore();

export default houseStore;
export { HouseStore };

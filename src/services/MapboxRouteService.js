import polylineDecoder from '@mapbox/polyline';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiYnVyb3Z5YSIsImEiOiJjanVucnE3bHMweHRlM3pvNXAycXllaHl5In0.ytKUDnITJq8JScaXHW3qzQ';
const MAPBOX_API_URL = 'https://api.mapbox.com/directions/v5/mapbox/walking';

class MapboxRouteService {
  static getRoute(positions) {
    //Преобразование массива координат [lat,lng] в строку lng,lat;lng,lat
    const coordinates = positions
      .map(pos => {
        return pos
          .slice()
          .reverse()
          .join(',');
      })
      .join(';');

    //Объект с параметрами запроса
    const params = {
      coordinates: coordinates,
      overview: 'full'
    };

    //Формирование параметра для application/x-www-form-urlencoded
    const searchParams = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');

    //Url для запроса
    const url = new URL(
      `${MAPBOX_API_URL}?access_token=${MAPBOX_ACCESS_TOKEN}`
    );

    //Запрос на построение маршрута
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: searchParams
    })
      .then(response => {
        return response.json();
      })
      .then(routeData => {
        return routeData.routes.map(route => {
          return {
            latLngs: polylineDecoder.decode(route.geometry),
            distance: route.distance
          };
        });
      });
  }
}

export default MapboxRouteService;

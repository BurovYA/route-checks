import polylineDecoder from '@mapbox/polyline';

class SputnikRouteService {
  static getRoute(positions) {
    //let url = new URL('http://routes.maps.sputnik.ru/osrm/router/viaroute');
    //let params = {
    //locs: polylineDecoder.encode(positions)
    //};

    let url = new URL(
      `http://router.project-osrm.org/route/v1/car/polyline(${polylineDecoder.encode(
        positions
      )})`
    );

    //Object.keys(params).forEach(key =>
    //url.searchParams.append(key, params[key])
    //);

    //positions.forEach(position => url.searchParams.append('loc', position));

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  }
}

export default SputnikRouteService;

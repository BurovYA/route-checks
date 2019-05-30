import axios from 'axios';

class Houses {
  static all() {
    return axios.get('/houses.json').then(resp => resp.data);
  }
}

export default Houses;

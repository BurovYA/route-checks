const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const houses = [
  {
    address: 'г. Москва, ул. Усачева, 33, строен. 1',
    position: [55.723188, 37.561111],
    zone: {
      name: 'CЭ-1',
      chief: {
        name: 'Крылоносов Семен Павлович',
        photo: 'http://webapplayers.com/inspinia_admin-v2.7.1/img/a2.jpg'
      }
    }
  },
  {
    address: 'г. Москва, ул. Усачева, 33/2, строен. 6',
    position: [55.722886, 37.561487],
    zone: {
      name: 'CЭ-1',
      chief: {
        name: 'Крылоносов Семен Павлович',
        photo: 'http://webapplayers.com/inspinia_admin-v2.7.1/img/a2.jpg'
      }
    }
  },
  {
    address: 'г. Москва, ул. Лужники, 1с2',
    position: [55.725193, 37.561013],
    zone: {
      name: 'CЭ-95',
      chief: {
        name: 'Акимова Ольга Владимировна',
        photo: 'http://webapplayers.com/inspinia_admin-v2.7.1/img/a3.jpg'
      }
    }
  },
  {
    address: 'г. Москва, Лужнецкий пр-д, 1',
    position: [55.725409, 37.560311],
    zone: {
      name: 'CЭ-95',
      chief: {
        name: 'Акимова Ольга Владимировна',
        photo: 'http://webapplayers.com/inspinia_admin-v2.7.1/img/a3.jpg'
      }
    }
  },
  {
    address: 'г. Москва, ул. 10-летия Октября, 2с4',
    position: [55.725817, 37.560676],
    zone: {
      name: 'CЭ-95',
      chief: {
        name: 'Акимова Ольга Владимировна',
        photo: 'http://webapplayers.com/inspinia_admin-v2.7.1/img/a3.jpg'
      }
    }
  }
];

app.get('/api/houses', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  return response.send(JSON.stringify(houses));
});

app.get('/', function(request, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8081);

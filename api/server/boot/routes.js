const axios = require('axios');
const { get } = require('lodash');

const LIMIT = 10;
const config = require('../../config');

module.exports = function(app) {
  var router = app.loopback.Router();

  router.get(app.get('restApiRoot') + '/recommendations', function(req, res) {
    const userId = req.query.userId || JSON.parse(req.query.filter).userId;

    if (!userId) {
      return res.status(500).json({ status: 500 });
    }


    axios.get(`${config.core_url}/recommendations?userId=${userId}&top=${LIMIT}`).then(response => {
      return get(response, 'data');
    }).then(ids => {
      const filter = {
        where: {
          did: { inq: ids.map(i => i.toString()) }
        },
        include: 'genres'
      };

      return app.models.Movie.find(filter);
    }).then(data => {
      console.log(data);
      res.header('Access-Control-Expose-Headers', 'x-total-count');
      res.header('X-Total-Count', LIMIT);
      res.json(data);
    }).catch(error => {
      res.status(500).json(error);
    });
  });

  app.use(router);
};

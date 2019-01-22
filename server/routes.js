import path from 'path';

import stockApi from './api/stock';


export default (app) => {
  app.use('/api/stock', stockApi);


  /**
   * default response index.html
   */
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(__dirname, '../client/index.html'));
    });
}
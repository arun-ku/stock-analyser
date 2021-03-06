import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import compression from 'compression'

const app = express();

app.use(compression());

mongoose.connect('mongodb://root:asdfgh@ds161136.mlab.com:61136/stockanalyser', { useMongoClient: true });
mongoose.connection.on('error', () => {
  console.log('##Mongo connection failed$$');
});
mongoose.connection.once('open', function() {
  console.log('##Mongo Connected$$')
});

import Routes from './routes';
import path from 'path';

require('./configs/register');

app.use(bodyParser.json())

app.use('/js', express.static('dist'));
app.use('/images', express.static(path.resolve(__dirname, '../dist/images')));
Routes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("App listening on port 3000");
});
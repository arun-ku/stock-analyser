import express from 'express';
import path from 'path';
import {parse as parseQueryString} from 'query-string';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost/stockAnalyser', { useMongoClient: true });
mongoose.connection.on('error', () => {
  console.log('########Mongo connection failed#############');
});
mongoose.connection.once('open', function() {
  console.log('###################################connected$$$$$$$$$$$$$$$$')
});

import Routes from './routes';

require('./configs/register');

app.use(bodyParser.json())

app.use('/bundle.js', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../dist/bundle.js'));
});

Routes(app);

// app.use("/", (req,res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
//   // request('http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=21&tp=1&frmdt=05-Dec-2017&todt=11-Dec-2017', function (error, response, body) {
//   //     // console.log('error:', error); // Print the error if one occurred
//   //     // console.log('statusCode:', response); // Print the response status code if a response was received
//   //     console.log('body:', body.split('\n').filter(name => name).map(name => name.split(';')).filter(arr => arr[0] === '118778')); // Print the HTML for the Google homepage.
//   // });
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("App listening on port 3000");
});
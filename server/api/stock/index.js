import express from 'express';
import request from 'request';
import async from 'async';

import stock from './stock.model';
import stockInfo from './stockInfo.model';

import { createUrlForNDays, getPlainUrl } from '../../../utils/commonUtils'

var router = express.Router();

router.post('/stock', (req,res) => {

  const plainUrl = createUrlForNDays(req.body.plainUrl, (365 * 4));

  stockInfo.find({ id: req.body.id }).lean().exec((err, data) => {
    if (data && data.length) {
      res.send({ success: true });
    } else {
      request(plainUrl, function (error, response, body) {
        let mappedData = body.split('\n').filter(name => name).map(name => name.split(';')).map(arr => ({
          id: arr[0],
          name: arr[1],
          nav: arr[2],
          repurchasePrice: arr[3],
          salePrice: arr[4],
          date: +new Date(arr[5]),
        })).filter(obj => obj.salePrice && obj.date && obj.id === req.body.id);

        for(let i = 124; i < mappedData.length; i++) {
          mappedData[i].nav120 = mappedData.avgOfLast124(i - 1, 'nav');
          if (i >= 200) {
            mappedData[i].nav200 = mappedData.avgOfLast200(i - 1, 'nav');
          }
        }

        let max120 = 0, min120 = 0, max200 = 0, min200 = 0;

        mappedData = mappedData.map(obj => {
          let newObj = {
            ...obj,
          };
          if (obj.nav120) {
            newObj.nav120Ratio = Number((Number(obj.nav)/obj.nav120));
          } else {
            newObj.nav120Ratio = 0;
          }
          if (obj.nav200) {
            newObj.nav200Ratio = Number((Number(obj.nav)/obj.nav200));
          } else {
            newObj.nav200Ratio = 0;
          }

          if (max120) {
            if (newObj.nav120Ratio > max120) {
              max120 = newObj.nav120Ratio;
            }
          } else {
            max120 = newObj.nav120Ratio;
          }

          if (min120) {
            if (newObj.nav120Ratio < min120) {
              min120 = newObj.nav120Ratio;
            }
          } else {
            min120 = newObj.nav120Ratio;
          }

          if (max200) {
            if (newObj.nav200Ratio > max200) {
              max200 = newObj.nav200Ratio;
            }
          } else {
            max200 = newObj.nav200Ratio;
          }

          if (min200) {
            if (newObj.nav200Ratio < min200) {
              min200 = newObj.nav200Ratio;
            }
          } else {
            min200 = newObj.nav200Ratio;
          }

          return newObj;
        });

        max120 = Number(max120);
        min120 = Number(min120);
        max200 = Number(max200);
        min200 = Number(min200);

        const AnalysisData = mappedData.map((dataObj, index) => {
          return (callback) => {
            const {
              id, name, nav, repurchasePrice, salePrice, date, nav120, nav200, nav200Ratio, nav120Ratio
            } = dataObj;
            stock.create({
              id,
              name,
              nav,
              repurchasePrice,
              salePrice,
              date,
              nav120,
              nav200,
              nav120Ratio,
              nav200Ratio,
            }, () => {
              callback();
            });
          };
        });

        stockInfo.create({
          id: req.body.id,
          name: mappedData[0].name,
          max200,
          max120,
          min200,
          min120,
        }, () => {
          async.series(AnalysisData, function() {
            res.send({ success: true });
          });
        });
      })
    }
  })
});

router.get('/data', (req, res) => {
  const plainUrl = createUrlForNDays(req.query.url, 10);
  request(plainUrl, function (error, response, body) {
    const mappedDataAll = body.split('\n').filter(name => name).map(name => name.split(';')).map(arr => {
      if (!arr) {
        return {}
      }
      return {
        id: arr[0],
        name: arr[1],
        nav: arr[2],
        repurchasePrice: arr[3],
        salePrice: arr[4],
        date: +new Date(arr[5]),
      }
    }).filter(obj => {
      return obj.nav && obj.date
    });
    const IdsArray = mappedDataAll.map(data => data.id);
    const uniqueIds = [...new Set(IdsArray)];
    const allStocks = uniqueIds.map(id => {
      return mappedDataAll.reverse().find(data => data.id === id);
    });

    res.send({
      allStocks,
      plainUrl,
    });

  });
});

router.get('/stockdata', (req, res) => {
  const id = req.query.id;
  stockInfo.findOne({ id }).lean().exec((err, stockInfo) => {
    if (!stockInfo || err) {
      res.send({ status: 'LOADING' });
    } else {
      stock.find({ id }).limit(20).sort({ 'date': -1 }).lean().exec((err, stockData) => {
        if (stockData && stockData.length && stockData.length >= 20) {
          res.send({ stockData: stockData, stockInfo });
        } else {
          res.send({ status: 'LOADING' });
        }
      })
    }
  })
});

router.get('/stocklist', (req, res) => {
  const url = getPlainUrl(req.query.mf, req.query.mft);
  const plainUrl = createUrlForNDays(url, 20);
  console.log(plainUrl);
  request(plainUrl, function (error, response, body) {
    if (!body) {
      return res.send({ allStocks: [], test: true })
    }

    if (body.indexOf(`No data found on the basis of selected parameters for this report`) > -1) {
      return res.send({ allStocks: [], test: true })
    }

    const mappedDataAll = body
      .split('\n') // split all rows to get individual rows
      .filter(row => !!row) // ignore rows which are empty
      .map(row => row.split(';')) // split values in each row by delimiter
      .map(arr => {  // create proper object for values
        if (!arr) {
          return {}
        }

        return {
          id: arr[0],
          name: arr[1],
          nav: arr[2],
          repurchasePrice: arr[3],
          salePrice: arr[4],
          date: +new Date(arr[5]),
          isTaxSaving: `${arr[1]}`.toLowerCase().indexOf('elss') > -1 || `${arr[1]}`.toLowerCase().indexOf('tax') > -1,
          isDividend: `${arr[1]}`.toLowerCase().indexOf('dividend') > -1,
          isDirect: `${arr[1]}`.toLowerCase().indexOf('direct') > -1,
          isRegular: `${arr[1]}`.toLowerCase().indexOf('regular') > -1,
          isGrowth: `${arr[1]}`.toLowerCase().indexOf('growth') > -1,
          isETF: `${arr[1]}`.toLowerCase().indexOf('exchange traded fund') > -1 || `${arr[1]}`.toLowerCase().indexOf('etf') > -1,
          isIndexFund: `${arr[1]}`.toLowerCase().indexOf('index fund') > -1,
        }
      })



    const mappedDataNew = [];
    let currentIndex = -1;
    mappedDataAll.forEach(arr => {
      if (!(arr.nav && arr.date)) {
        if (arr.id && arr.id !== '\r' && arr.id.indexOf('(') > -1) {
          currentIndex += 1;
          mappedDataNew[currentIndex] = {
            blockName: arr.id,
            blockData: [],
          }
        }
      } else if (mappedDataNew[currentIndex]) {
        const blockData = mappedDataNew[currentIndex].blockData;
        if (!mappedDataNew[currentIndex].blockData.find(stock => stock.id === arr.id)) {
          arr.labels = [];
          arr.isDividend && arr.labels.push('Dividend');
          arr.isTaxSaving && arr.labels.push('ELSS');
          arr.isDirect && arr.labels.push('Direct');
          arr.isGrowth && arr.labels.push('Growth');
          arr.isRegular && arr.labels.push('Regular');
          arr.isETF && arr.labels.push('ETF');
          arr.isIndexFund && arr.labels.push('Index Fund');
          mappedDataNew[currentIndex].blockData = [...blockData, arr]
        }
      }
    });

    res.send({
      allStocks: mappedDataNew,
    });

  });
});

router.post('/stockDataById', (req,res) => {
  const url = getPlainUrl(req.body.mf, req.body.mft);
  const plainUrl = createUrlForNDays(url, (365 * 4));
  stockInfo.find({ id: req.body.id }).lean().exec((err, data) => {
    if (data && data.length) {
      res.send({ success: true });
    } else {
      request(plainUrl, function (error, response, body) {
        let mappedData = body.split('\n').filter(name => name).map(name => name.split(';')).map(arr => ({
          id: arr[0],
          name: arr[1],
          nav: arr[2],
          repurchasePrice: arr[3],
          salePrice: arr[4],
          date: +new Date(arr[5]),
        })).filter(obj => obj.nav && obj.date && obj.id === req.body.id);

        for(let i = 124; i < mappedData.length; i++) {
          mappedData[i].nav120 = mappedData.avgOfLast124(i - 1, 'nav');
          if (i >= 200) {
            mappedData[i].nav200 = mappedData.avgOfLast200(i - 1, 'nav');
          }
        }

        let max120 = 0, min120 = 0, max200 = 0, min200 = 0;

        mappedData = mappedData.map(obj => {
          let newObj = {
            ...obj,
          };
          if (obj.nav120) {
            newObj.nav120Ratio = Number((Number(obj.nav)/obj.nav120));
          } else {
            newObj.nav120Ratio = 0;
          }
          if (obj.nav200) {
            newObj.nav200Ratio = Number((Number(obj.nav)/obj.nav200));
          } else {
            newObj.nav200Ratio = 0;
          }

          if (max120) {
            if (newObj.nav120Ratio > max120) {
              max120 = newObj.nav120Ratio;
            }
          } else {
            max120 = newObj.nav120Ratio;
          }

          if (min120) {
            if (newObj.nav120Ratio < min120) {
              min120 = newObj.nav120Ratio;
            }
          } else {
            min120 = newObj.nav120Ratio;
          }

          if (max200) {
            if (newObj.nav200Ratio > max200) {
              max200 = newObj.nav200Ratio;
            }
          } else {
            max200 = newObj.nav200Ratio;
          }

          if (min200) {
            if (newObj.nav200Ratio < min200) {
              min200 = newObj.nav200Ratio;
            }
          } else {
            min200 = newObj.nav200Ratio;
          }

          return newObj;
        });

        max120 = Number(max120);
        min120 = Number(min120);
        max200 = Number(max200);
        min200 = Number(min200);
        const noOfRecords = mappedData.length;

        const AnalysisData = mappedData.reverse().map((dataObj, index) => {
          return (callback) => {
            const {
              id, name, nav, repurchasePrice, salePrice, date, nav120, nav200, nav200Ratio, nav120Ratio
            } = dataObj;
            stock.create({
              id,
              name,
              nav,
              repurchasePrice,
              salePrice,
              date,
              nav120,
              nav200,
              nav120Ratio,
              nav200Ratio,
            }, () => {
              callback();
            });
          };
        });

        async.series(AnalysisData, function() {
          stockInfo.create({
            id: req.body.id,
            name: mappedData[0] && mappedData[0].name,
            max200,
            max120,
            min200,
            min120,
            noOfRecords,
          }, () => {
            console.log('All Entries Logged')
            res.send({ success: true });
          });
        });

        stockInfo.create({
          id: req.body.id,
          name: mappedData[0] && mappedData[0].name,
          max200,
          max120,
          min200,
          min120,
          noOfRecords,
        }, () => {
          console.log('Stock Info Logged')
        });
      })
    }
  })
});

module.exports = router;

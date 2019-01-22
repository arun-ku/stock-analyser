import axios from 'axios';
import get from 'lodash/get';
export const getStockDataForAnalysis = (url) => {
  return (dispatch, getState) => {
    return axios.get('/api/stock/data', {
      params: {
        url,
      }
    }).then(res => {
      // this.setState({ data: res.data.allStocks })
      console.log(res.data.allStocks);
      dispatch({
        type: "UPDATE_STOCK_NAMES",
        payload: res.data.allStocks
      })
      return res;
    });
  }
};

export const saveStockDataForAnalysis = (params) => {
  return (dispatch, getState) => {
    return axios.post('/api/stock/stockDataById', params, {
      timeout: 40000,
    })
  }
};


export const getAnalysedData = (params) => {
  return (dispatch, getState) => {
    let count = 0;
    dispatch({
      type: 'LOADER',
      payload: {
        stockDataStatus: 'LOADING',
      },
    });
    axios.get('/api/stock/stockdata', {
      params,
    }).then(res => {
      const stockInfo = get(res, 'data.stockInfo');
      if (!(stockInfo && stockInfo.id)) {
        const interval = setInterval(() => {
          return axios.get('/api/stock/stockdata', {
            params,
          }).then(res => {
            const stockInfo = get(res, 'data.stockInfo');
            if (stockInfo && stockInfo.id) {
              clearInterval(interval);
              dispatch({
                type: "STOCK_TABLE_DATA",
                payload: res.data,
              });
              dispatch({
                type: 'LOADER',
                payload: {
                  stockDataStatus: 'SUCCESS',
                },
              });
            }
            if (count >= 6) {
              clearInterval(interval);
              count = 0;
              dispatch({
                type: "SHOW_ERROR_MODAL",
                data: {
                  message: 'No data found! Please try after some time.'
                },
              })
            } else {
              count++;
            }
          });
        }, 15000)
      } else {
        dispatch({
          type: "STOCK_TABLE_DATA",
          payload: res.data,
        });
        dispatch({
          type: 'LOADER',
          payload: {
            stockDataStatus: 'SUCCESS',
          },
        });
      }
    });
  }
};

/**
 * New Api's
 **/

export const getStockList = (params) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADER',
      payload: {
        stockListStatus: 'LOADING',
      },
    });
    return axios.get('/api/stock/stocklist', {
      params,
    }).then(res => {
      dispatch({
        type: "SET_STOCK_LIST",
        payload: res.data,
      });
      dispatch({
        type: 'LOADER',
        payload: {
          stockListStatus: 'SUCCESS',
        },
      });
    });
  }
};
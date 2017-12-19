import axios from 'axios';
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

export const saveStockDataForAnalysis = (id, plainUrl) => {
  return (dispatch, getState) => {
    return axios.post('/api/stock/stock', {
      id,
      plainUrl,
    }, {
      timeout: 40000,
    })
  }
};


export const getAnalysedData = (id) => {
  return (dispatch, getState) => {
    return axios.get('/api/stock/stockdata', {
      params: {
        id,
      }
    }).then(res => {
      dispatch({
        type: "STOCK_TABLE_DATA",
        payload: res.data,
      })
    });
  }
};
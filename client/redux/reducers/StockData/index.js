export default (state = {
  allStocks: [],
  stockData: [],
  stockInfo: {},
}, action) => {
  switch (action.type) {
    case "UPDATE_STOCK_NAMES":
      return Object.assign({}, state, { allStocks: action.payload});
    case "STOCK_TABLE_DATA":
      return Object.assign({}, state, { stockData: action.payload.stockData, stockInfo: action.payload.stockInfo });
    case "SET_STOCK_LIST":
      return Object.assign({}, state, { stocks: action.payload.allStocks });
    default:
      return state;
  }
};
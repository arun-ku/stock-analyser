export default (state = {
  allStocks: [],
  stockData: [],
  stockInfo: {},
}, action) => {
  switch (action.type) {
    case "UPDATE_STOCK_NAMES":
      return Object.assign({}, state, { allStocks: action.payload});
    case "STOCK_TABLE_DATA":
      console.log('##########', action.payload)
      return Object.assign({}, state, { stockData: action.payload.stockData, stockInfo: action.payload.stockInfo });
    default:
      return state;
  }
};
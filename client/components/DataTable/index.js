import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAnalysedData } from 'Actions';

import DataRow from './DataRow';
import DataTableHeader from './DataTableHeader';
import Analytics from './Analytics/MainTable';

import './style.scss';

class DataTable extends Component {

  state = {};

  componentDidMount() {
    const { getAnalysedData, match } = this.props;
    getAnalysedData(match.params.id);
  }

  render() {
    const { stockData, stockInfo } = this.props;
    console.log(stockData)
    return (
      <div>
        <div>
          <Analytics stockInfo={stockInfo} />
        </div>
        <DataTableHeader
          row={{
            date: "Date",
            id: "Id",
            name: "Name",
            nav: "NAV",
            nav120: "NAV 124",
            nav120Ratio: "Nav 124 / NAV",
            nav200: "NAV 200",
            nav200Ratio: "NAV 200 / NAV",
            repurchasePrice: "Repurchase Price",
            salePrice: "Sale Price",
          }}
        />
        {
          stockData && stockData.map((row, rowIndex) => (
            <DataRow
              key={`key_row_${rowIndex}`}
              row={row}
              rowIndex={rowIndex}
            />
          ))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stockInfo: state.StockData.stockInfo,
    stockData: state.StockData.stockData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
        getAnalysedData
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { getStockDataForAnalysis, saveStockDataForAnalysis } from 'Actions';

import './style.scss';
import DataRow from "./DataRow/index";

class Form extends Component {

  state = {
    data: [],
    url: 'http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=21&tp=1&frmdt=18-Dec-2017&todt=18-Dec-2017',
  };

  handleChange = (e, key) => {
    this.setState({ [`${key}`]: e.target.value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({buttonClicked: true})
    this.props.getStockDataForAnalysis(this.state.url).then(res => {
      this.setState({ plainUrl: res.data.plainUrl });
    });
    // axios.get('/api/stock/data', {
    //   params: {
    //     url: this.state.url,
    //   }
    // }).then(res => {
    //   this.setState({ data: res.data.allStocks })
    // });
  };

  handleRowClick = (selectedRowId) => this.setState({ selectedRowId })

  handleGoClick = (id) => {
    const { plainUrl } = this.state;
    this.props.saveStockDataForAnalysis(id, plainUrl).then(() => {
      this.props.history.push(`/datatable/${id}`);
    })
  };

  render() {
    const { buttonClicked, selectedRowId } = this.state;
    const { stockData } = this.props;
    return (
      <div className={`base ${buttonClicked ? 'base-expanded' : ''}`}>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <input
              className="main-input"
              value={this.state.url}
              type="text"
              onChange={(e) => this.handleChange(e, 'url')}
            />
            <input className="btn submit-button" type="submit" value="Go"/>
          </form>
        </div>
        <div className="data-container">
          {
            stockData.allStocks.map((row, rowIndex) => (
              <DataRow
                key={`key_row_${rowIndex}`}
                row={row}
                rowIndex={rowIndex}
                handleRowClick={this.handleRowClick}
                selectedRowId={selectedRowId}
                handleGoClick={this.handleGoClick}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stockData: state.StockData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
        getStockDataForAnalysis,
        saveStockDataForAnalysis,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
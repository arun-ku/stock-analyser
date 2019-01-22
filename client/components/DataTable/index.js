import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { getAnalysedData } from 'Actions';

import DataRow from './DataRow';
import DataTableHeader from './DataTableHeader';
import Analytics from './Analytics/MainTable';
import Loader from '../FullScreenLoader';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    borderRadius: 0,
  },
  table: {

  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  rowRoot: {
    padding: 0,
  }
});
class DataTable extends Component {

  state = {};

  componentDidMount() {
    const { getAnalysedData, match, location } = this.props;
    const params = {};
    `${location.search}`.split('&').forEach(data => {
      const [key, val] = data.split('=');
      params[`${key}`.replace('?', '')] = `${val}`
    });
    params.id = match.params.id;
    getAnalysedData(params);
  }

  render() {
    const { stockData, stockInfo, classes, stockDataStatus } = this.props;

    const loaderMessage = 'Please wait while we load the data. This' +
      ' can take up to 1 min for the first time.';
    console.log('stockDataStatus', stockDataStatus)
    if (stockDataStatus === 'LOADING') {
      return <Loader message={loaderMessage} />;
    }

    return (
      <div>
        <div>
          <Analytics stockInfo={stockInfo} />
        </div>
        <div style={{ padding: 10 }}>
          <Paper className={classes.root}>
            <Table>
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
              <TableBody>
                {
                  stockData && stockData.map((row, rowIndex) => (
                    <DataRow
                      key={`key_row_${rowIndex}`}
                      row={row}
                      rowIndex={rowIndex}
                      classes={classes}
                    />
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stockInfo: state.StockData.stockInfo,
    stockData: state.StockData.stockData,
    stockDataStatus: state.StockData.stockDataStatus,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DataTable));
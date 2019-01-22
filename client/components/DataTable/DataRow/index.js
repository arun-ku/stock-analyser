import React, { Component } from 'react';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#f39c12',
    color: theme.palette.common.white,
    borderBottom: `1px solid #f39c12`,
    fontWeight: '600',
    padding: 0,
    paddingLeft: 5,
  },
  body: {
    fontSize: 14,
    padding: 0,
    paddingLeft: 5,
  },
}))(TableCell);

class DataRow extends Component {

  render() {
    const { row, rowIndex, classes } = this.props;
    return (
      <TableRow className={classes.row}>
        <CustomTableCell align="left">{row.id}</CustomTableCell>
        <CustomTableCell align="left">{row.name}</CustomTableCell>
        <CustomTableCell align="left">{row.nav}</CustomTableCell>
        <CustomTableCell align="left">{row.repurchasePrice}</CustomTableCell>
        <CustomTableCell align="left">{row.salePrice}</CustomTableCell>
        <CustomTableCell align="left">{moment(new Date(row.date)).format('D-MMM-YYYY')}</CustomTableCell>
        <CustomTableCell align="left">{row.nav120 && row.nav120.toFixed(2)}</CustomTableCell>
        <CustomTableCell align="left">{row.nav120 && row.nav120Ratio.toFixed(2)}</CustomTableCell>
        <CustomTableCell align="left">{row.nav200 && row.nav200.toFixed(2)}</CustomTableCell>
        <CustomTableCell align="left">{row.nav200 && row.nav200Ratio.toFixed(2)}</CustomTableCell>
      </TableRow>
    );
  }
}

export default DataRow;
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
  },
}))(TableCell);

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
});

class DataRow extends Component {

  render() {
    const { row, rowIndex } = this.props;
    return (
      <TableHead>
        <TableRow>
          <CustomTableCell  style={{ width: '10%' }} align="left">{row.id} </CustomTableCell>
          <CustomTableCell  style={{ width: '20%' }} align="left">{row.name} </CustomTableCell>
          <CustomTableCell  style={{ width: '10%' }} align="left">{row.nav} </CustomTableCell>
          <CustomTableCell  style={{ width: '10%' }} align="left">{row.repurchasePrice} </CustomTableCell>
          <CustomTableCell  style={{ width: '10%' }} align="left">{row.salePrice} </CustomTableCell>
          <CustomTableCell  style={{ width: '10%' }} align="left">{row.date} </CustomTableCell>
          <CustomTableCell  style={{ width: '10%' }} align="left">{row.nav120} </CustomTableCell>
          <CustomTableCell  style={{ width: '5%' }} align="left">{row.nav120Ratio} </CustomTableCell>
          <CustomTableCell  style={{ width: '10%' }} align="left">{row.nav200} </CustomTableCell>
          <CustomTableCell  style={{ width: '5%' }} align="left">{row.nav200Ratio} </CustomTableCell>
        </TableRow>
      </TableHead>
    );
  }
}

export default DataRow;
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
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CustomTableCellBody = withStyles(theme => ({
  body: {
    backgroundColor: '#f39c12',
    color: theme.palette.common.white,
    borderBottom: `1px solid #f39c12`,
    fontWeight: '600',
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

class MainTable extends Component {

  render() {
    const { stockInfo, classes } = this.props;
    const { min120, max120, min200, max200 } = stockInfo;
    const avg120 = Number((min120 + ((max120 - min120)/2)));
    const avg200 = Number((min200 + ((max200 - min200)/2)));
    const x120 = Number((avg120 - min120));
    const x200 = Number((avg200 - min200));
    const xFactor120 = (x120 / 5);
    const xFactor200 = (x200 / 5);

    if (!stockInfo || !Object.keys(stockInfo).length) {
      return <span />
    }

    return (
      <div>
        <Typography style={{ color: 'gray', marginBottom: -30, padding: 20 }} variant="h2" component="h4">
          {stockInfo.name}
        </Typography>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <Grid container justify="center" style={{padding: '10px 30px'}}>
              <Typography style={{ color: '#95a5a6', marginBottom: -20, width: '100%' }} variant="h4" component="h4">
                Basic Info
              </Typography>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell></CustomTableCell>
                      <CustomTableCell align="right">NAV 124/ NAV</CustomTableCell>
                      <CustomTableCell align="right">NAV 200/ NAV</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        Max
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(max120).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(max200).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        Min
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(min120).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(min200).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        Avg(max - min)
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(avg120).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(avg200).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        X(avg - min)
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(x120).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(x200).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        X/5
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(xFactor120).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(xFactor200).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="center" style={{padding: '10px 30px'}}>
              <Typography style={{ color: '#95a5a6', marginBottom: -20, width: '100%' }} variant="h4" component="h4">
                Values to Invest at
              </Typography>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>S. No.</CustomTableCell>
                      <CustomTableCell align="right">NAV 120/ NAV</CustomTableCell>
                      <CustomTableCell align="right">NAV 200/ NAV</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                       1
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(min120 + (xFactor120 * 4)).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(min200 + (xFactor200 * 4)).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        2
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(min120 + (xFactor120 * 3)).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(min200 + (xFactor200 * 3)).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        3
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(min120 + (xFactor120 * 2)).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(min200 + (xFactor200 * 2)).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        4
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(min120 + (xFactor120 * 1)).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(min200 + (xFactor200 * 1)).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCellBody component="th" scope="row">
                        5
                      </CustomTableCellBody>
                      <CustomTableCell align="right">{(min120).toTwoDecimals()}</CustomTableCell>
                      <CustomTableCell align="right">{(min200).toTwoDecimals()}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainTable);



import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { getStockList, saveStockDataForAnalysis } from '../../redux/actions/Stock'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 50,
    justifyContent: 'flex-start',
  },
  paper: {
    height: 300,
    width: 200,
    borderRadius: 0,
    marginLeft: 15,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  card: {
    width: 275,
    borderRadius: 0,
    height: '100%',
    position: 'relative',
    paddingBottom: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {

  },
  chipRoot: {
    height: 'auto',
    padding: '2px 0',
    borderRadius: 1,
    fontWeight: '600',
    marginRight: 2,
    backgroundColor: '#3498db',
  },
  priceChip: {
    height: 'auto',
    padding: '2px 0',
    borderRadius: 1,
    fontWeight: '600',
    marginRight: 2,
    color: '#7f8c8d',
  }
});


class FundList extends Component {

  componentDidMount() {
    const { location, getStockList } = this.props;
    const params = {};
    `${location.search}`.split('&').forEach(data => {
      const [key, val] = data.split('=');
      params[`${key}`.replace('?', '')] = `${val}`
    });
    getStockList(params);
  }

  handleRowClick = (id) => {
    const { location, history } = this.props;
    const params = {};
    `${location.search}`.split('&').forEach(data => {
      const [key, val] = data.split('=');
      params[`${key}`.replace('?', '')] = `${val}`
    });
    params.id = id;
    this.props.saveStockDataForAnalysis(params)
    history.push(`/datatable/${id}${location.search}`);
  };

  render() {
    const { classes, stocks } = this.props;

    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          {
            (stocks || []).map(block => {
              return (
                <div style={{ paddingBottom: 20, marginBottom: 30 }}>
                  <Typography style={{ color: 'gray', marginBottom: 10 }} variant="h4" component="h4">
                    {block.blockName}
                  </Typography>
                  <Grid container justify="flex-start" spacing={16}>
                    {
                      (block.blockData || []).map((stock, index) => (
                        <Grid key={index} item style={{ marginBottom: 10 }}>
                          <Card className={classes.card}>
                            <CardContent>
                              <Typography style={{ fontWeight: '600', color: 'darkcyan' }} variant="h6" component="h4">
                                {stock.name}
                              </Typography>
                              <Typography style={{ fontWeight: '600', color: '#2c3e50' }}>
                                {stock.nav}
                              </Typography>
                              {
                                (stock.labels || []).map(label => {
                                  return (
                                    <Chip
                                      classes={{
                                        root: classes.chipRoot,
                                      }}
                                      color="primary"
                                      label={label}
                                      className={classes.chip}
                                    />
                                  )
                                })
                              }
                            </CardContent>
                            <CardActions
                              onClick={() => this.handleRowClick(stock.id)}
                              style={{ position: 'absolute', bottom: 0 }}
                            >
                              <Button size="small">Get Analysis</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    }
                  </Grid>
                </div>
              )
            })
          }
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.StockData.stocks,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getStockList,
    saveStockDataForAnalysis,
  }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(FundList);
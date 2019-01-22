import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CryImg from './cry1.png';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBase: {
    backgroundColor: '#fff',
    padding: '35px 35px',
    display: 'flex',
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  errorText: {
    color: '#7f8c8d',
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 32,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
  },
  errorImage: {
    width: 200,
  }
});

class Loader extends Component {
  render () {
    const { classes, message, error } = this.props;
    return (
      <div className={classes.overlay}>
        <Paper className={classes.root} elevation={1}>
          <img className={classes.errorImage} src={CryImg} />
          <div className={classes.errorText}>
            {
              error
              || 'No data found. Please go back to last page.'
            }
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Loader);
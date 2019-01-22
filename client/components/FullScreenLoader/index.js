import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    backgroundColor: 'rgba(0,0,0, .4)',
  },
  loaderBase: {
    backgroundColor: '#fff',
    padding: '35px 35px',
    display: 'flex',
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loaderText: {
    color: '#7f8c8d',
    fontWeight: '600',
    marginTop: 25,
    textAlign: 'center',
  }
});

class Loader extends Component {
  render () {
    const { classes, message } = this.props;
    return (
      <div className={classes.overlay}>
        <div className={classes.loaderBase}>
          <CircularProgress className={classes.progress} />
          <div className={classes.loaderText}>
            <i>
              {message || 'Loading...'}
            </i>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Loader);
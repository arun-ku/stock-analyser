
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Assessment from '@material-ui/icons/Assessment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AutoSuggest from './AutoSuggest';
import mfData from '../../../server/data/MFData';
import MFTypes from '../../../server/data/MFTypes';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component {
  state = {
    selectedValueMF: null,
    selectedValueMFT: null,
  };

  handleSelect = (key) => (selectedValue) => {
    this.setState({ [key]: selectedValue });
  };

  handleSubmitClick = () => {
    const { selectedValueMF, selectedValueMFT } = this.state;
    const { history } = this.props;
    const redirectUrl = `/fundList?mf=${selectedValueMF.value}&mft=${selectedValueMFT.value}`;
    history.push(redirectUrl);
  };

  render() {
    const { selectedValueMF, selectedValueMFT, error } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Assessment />
          </Avatar>
          <Typography component="h1" variant="h5">
            Get Started
          </Typography>
          <AutoSuggest
            placeholder="Select Stock"
            selectedValue={selectedValueMF}
            data={mfData}
            handleSelect={this.handleSelect('selectedValueMF')}
          />
          <div style={{ marginTop: 20, width: '100%' }}>
            <AutoSuggest
              placeholder="Select Type"
              selectedValue={selectedValueMFT}
              data={MFTypes}
              handleSelect={this.handleSelect('selectedValueMFT')}
            />
          </div>
          {
            !!error && (
              <Typography style={{ marginTop: 10 }} component="span" color="secondary">
                {error}
              </Typography>
            )
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleSubmitClick}
          >
            Get List
          </Button>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
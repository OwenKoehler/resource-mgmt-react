import React from "react";
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(2),
  },
}));

function Header(props) {
  const classes = useStyles();

  const routeChange = () => {
    let path = `/profiles`;
    props.history.push(path);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h6" className={classes.title} color="inherit">
            Resource Management
          </Typography>
          <Button
            color="inherit"
            onClick={routeChange}
          >
          Profiles
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);

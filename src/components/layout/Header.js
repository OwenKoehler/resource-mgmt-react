import React from "react";
import { AppBar } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export default function Header() {
  return (
    <AppBar position="static">
      <Typography variant="h6" color="inherit">
        Resource Management
      </Typography>
    </AppBar>
  );
}

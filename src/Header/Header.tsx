import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      marginBottom: '20px'
    },
  });
  
export default function SimpleAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Stand Up
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
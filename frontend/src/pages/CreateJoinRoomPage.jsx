import React from 'react';
import { useState } from 'react';
import {
  Tabs,
  Tab,
  AppBar,
  CssBaseline,
  makeStyles,
  Container,
  Grid,
  Typography,
} from '@material-ui/core/';
import Create from '../components/Create';
import Join from '../components/Join';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function CreateJoinRoomPage() {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  function handleChange(e, newValue) {
    setValue(newValue);
  }

  return (
    <Container id="container" component="main" maxWidth="xs">
      <Grid container justify="center">
        <Grid item align="center">
          <Typography marginTop="10" color="primary" align="center" variant="h2" gutterBottom>
            OctoTube
          </Typography>
        </Grid>
      </Grid>
      <CssBaseline id="cssBaseLine" />
      <div id="check" className={classes.paper}>
        <AppBar id="appBar" position="static">
          <Tabs id="tabs" value={value} onChange={handleChange}>
            <Tab id="t1" label="Create room" />
            <Tab id="t2" label="Join room" />
          </Tabs>
        </AppBar>

        {value === 0 ? <Create /> : <Join />}
      </div>
    </Container>
  );
}

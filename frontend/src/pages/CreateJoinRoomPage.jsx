import { useState } from 'react';
import { Tabs, Tab, AppBar, CssBaseline, makeStyles, Container } from '@material-ui/core/';
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Create room" />
            <Tab label="Join room" />
          </Tabs>
        </AppBar>

        {value === 0 ? <Create /> : <Join />}
      </div>
    </Container>
  );
}

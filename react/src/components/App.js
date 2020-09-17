import React from 'react';
import {makeStyles, CssBaseline} from "@material-ui/core";
import Sidebar from './Sidebar';
import Header from './Header';


const useStyles = makeStyles({
    main: {
        paddingLeft: '320px',
        width: '100%',
    }
});


function App() {
  const classes = useStyles();

  return (
    <>
      <Sidebar />
      <div className={classes.main}>
        <Header/>
      </div>
      <CssBaseline />
    </>
  );
}

export default App;

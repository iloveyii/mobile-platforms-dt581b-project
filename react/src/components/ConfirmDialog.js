import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import Popup from './Popup';
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from './Snackbar';

const useStyles = makeStyles(theme => ({
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    },
    container: {
      display: 'flex'
    },
    left:{
      flex: 1
    },
    right: {
      flex: 2,
      display: 'flex',
      flexDirection: 'column'
    },
    top: {
      flex: 2
    },
    bottom: {
      flex: 1,
      textAlign: 'right'
    }
}));

export default function ConfirmDialog(props) {
    const { showDialog, setShowDialog, action, onDelete } = props;
    const [status, setStatus] = useState('');
    const classes = useStyles();
    return (

        <Popup openPopup={showDialog} setOpenPopup={setShowDialog}>
            <div className={classes.container}>
              <div className={classes.left}>
                <IconButton className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
              </div>
              <div className={classes.right}>
                <div className={classes.top}>
                </div>

                <div className={classes.bottom}>
                  <Button
                      style={{ marginTop: "1em" }}
                      margin="normal"
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={(e)=>{onDelete(e); setStatus('delete.success');  setTimeout(()=>setShowDialog(false), 4000)}}
                  >
                      Yes
                  </Button>

                  <Button
                      style={{ marginTop: "1em", marginLeft: "2em" }}
                      margin="normal"
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => setShowDialog(false)}
                  >
                      No
                  </Button>
                </div>
              </div>
            </div>
            <Snackbar status={status} />
        </Popup >
    );
}

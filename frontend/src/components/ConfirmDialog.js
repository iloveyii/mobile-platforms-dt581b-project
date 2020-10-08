import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import Popup from './Popup';
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from 'notistack';
import red from '@material-ui/core/colors/red';


const useStyles = makeStyles(theme => ({
    titleIcon: {
        backgroundColor: red[500],
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
    const { open, setOpen, onDelete } = props;
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    return (

        <Popup open={open} setOpen={setOpen} title='Confirm ?'>
            <div className={classes.container}>
              <div className={classes.left}>
                <IconButton className={classes.titleIcon}>
                    <HelpOutlineIcon />
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
                      onClick={(e)=>{onDelete(e); setOpen(false);}}
                  >
                      Yes
                  </Button>

                  <Button
                      style={{ marginTop: "1em", marginLeft: "2em" }}
                      margin="normal"
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => setOpen(false)}
                  >
                      No
                  </Button>
                </div>
              </div>
            </div>
        </Popup>
    );
}

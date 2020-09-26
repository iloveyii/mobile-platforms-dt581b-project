import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NotListedLocationIcon from '@material-ui/icons';
import Popup from './Popup';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    }
}))

export default function ConfirmDialog(props) {
    const { showDialog, setShowDialog, action } = props;
    const classes = useStyles();
    return (

        <Popup openPopup={showDialog} setOpenPopup={setShowDialog}>
            <IconButton className={classes.titleIcon}>
                <NotListedLocationIcon />
            </IconButton>
            <Button
                style={{ marginTop: "1em" }}
                margin="normal"
                size="large"
                variant="contained"
                color="secondary"
                onClick={action}
            >
                Yes
            </Button>

            <Button
                style={{ marginTop: "1em" }}
                margin="normal"
                size="large"
                variant="contained"
                color="primary"
                onClick={() => setShowDialog(false)}
            >
                No
            </Button>
        </Popup >
    );
}

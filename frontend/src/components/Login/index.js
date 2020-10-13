import React from 'react';
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { withStyles } from '@material-ui/styles';
import IconTextField from '../IconTextField';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";

import models from '../../store';



import './style.css';
import { CenterFocusStrong } from '@material-ui/icons';

const styles = theme => ({
    root: {
      // marginTop: theme.spacing(1),
      textAlign: 'center',
      "& .MuiCardMedia-root": {
        margin: theme.spacing(2)
      }
    },
    outer: {
      display: "flex",
      flexDirection: 'column',
      border: "none"
    },
    details: {
      display: "flex",
      width: '100%',
      flexDirection: "column",
      textAlign: 'center'
    },
    content: {
      flex: "1 0 auto"
    },
    cover: {
      width: 151
    },
    icon: {
            display: 'flex',
            alignSelf: 'center'
    }
  });

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const imageUrl = '/images/lock.jpg';
        const title = 'Login';
        const subtitle = 'Sign up';

        return(
            <>
                <div className="top">

                    <div className="login-container">
                        <div className="login-header">
                            <img src='/images/lock.jpg' style={{height: '72px'}}/>
                        </div>
                        <div className="login-content">
                        <Paper className={classes.root}>
                        <Card className={classes.outer} variant="outlined" raised={true}>
                            <CardContent className={classes.details}>
                                <Typography color='primary' style={{flex:1}} component="h4" variant="h4">
                                    {title}
                                </Typography>

                                <form>
                                    <IconTextField type="text" Icon={EmailOutlinedIcon} name='email' label='Email' onChange={()=>null} />
                                    <IconTextField type="password" Icon={LockOutlinedIcon} name='password' label='Password' onChange={()=>null} />
                                    <Button
                                        style={{ marginTop: "1em", width: '80%', marginTop: '30px' }}
                                        margin="normal"
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth={true}
                                        >
                                        Login
                                    </Button>
                                </form>
                            </CardContent>
                            <CardActionArea>
                                <div className="card-footer">
                                    <div className='section'>
                                        <LockOutlinedIcon className={classes.icon}  fontSize="large" />
                                        <strong>Register</strong>
                                        <p style={{margin: 0}}>Not a member yet ?</p>
                                    </div>
                                    <div className='section'>
                                        <HomeWorkOutlinedIcon className={classes.icon}  fontSize="large" />
                                        <strong>Return to Home page</strong>
                                        <p style={{margin: 0}}>Go back to home page.</p>
                                    </div>
                                </div>
                            </CardActionArea>
                        </Card>
                    </Paper>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="bottom"></div>
            </>
        )
    }
}


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
    editResetAction: models.users.actions.edit_reset,
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(Login)));

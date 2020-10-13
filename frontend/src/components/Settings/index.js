import React from 'react';
import PageHeader from "../PageHeader";
import {
  Container,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(1),
    display: "flex",
    marginTop: theme.spacing(5),
    "& .MuiCardMedia-root": {
      margin: theme.spacing(2)
    }
  },
  outer: {
    display: "flex",
    border: "none"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  }
}));



function Settings(props) {

    const classes = useStyles();
    const { title, subtitle, imageUrl } = props;

    return (
      <Container maxWidth="md">
        <PageHeader
          title="SETTINGS"
          subtitle="Settings for app"
          imageUrl="/images/settings.png"
        />

        <Paper className={classes.root} elevation={0}>
          <Card className={classes.outer} variant="outlined" raised={false}>
            <CardMedia className={classes.cover} image={'imageUrl'} />

            <CardContent className={classes.details}>
              <Typography component="h5" variant="h5">
                title
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                sub
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    )
  }

export default Settings;

import React from "react";
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    display: "flex",
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

export default function PageHeader() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Card className={classes.outer} variant="outlined" raised={false}>
        <CardMedia
          className={classes.cover}
          image="/images/good-health-and-well-being-sdg.jpg"
        />

        <CardContent className={classes.details}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}

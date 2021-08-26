import React from 'react'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";

const CardComponent = (props) => {
  const {
    onProvided: provided,
    onClasses: classes,
    onItem : item,
    onSnapShot: snapshot,
  } = props

  return (
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              {item.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            className="editBtn"
          >
            <MoreVertIcon
              onClick={() =>
                console.log("Edit")
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Chip label={item.taskdate} />
          </Grid>
          <Grid
            item
            xs
            className="taskCount"
          >
            <CheckBoxOutlinedIcon />
            {item.done} / {item.taskcount}
          </Grid>
        </Grid>
      </CardContent>
  )
}

export default CardComponent

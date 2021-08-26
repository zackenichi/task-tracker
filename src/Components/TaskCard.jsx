import React from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import Grid from "@material-ui/core/Grid";

const TaskCard = (props) => {
  const { onClasses: classes, onItem: item } = props;

  return (
    <CardContent>
      <Grid container>
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
      <Grid container spacing={3}>
        <Grid item xs>
          <Chip label={item.taskdate} />
        </Grid>
        <Grid item xs className="taskCount">
          <CheckBoxOutlinedIcon />
          {item.done} / {item.taskcount}
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TaskCard;

import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import uuid from "uuid/v4";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { TaskData } from "./TaskData";
import TaskCard from "./TaskCard";

const taskTodo = TaskData.filter((task) => task.status === "to do");
const taskInProgress = TaskData.filter((task) => task.status === "in progress");
const taskDone = TaskData.filter((task) => task.status === "done");

const columnsFromBackend = {
  [uuid()]: {
    name: "To do",
    items: taskTodo,
  },
  [uuid()]: {
    name: "In Progress",
    items: taskInProgress,
  },
  [uuid()]: {
    name: "Done",
    items: taskDone,
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const Tasks = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const classes = useStyles();

  return (
    <Grid container direction="row" justifyContent="center" spacing={3}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <Grid
                        item
                        xs
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          // background: snapshot.isDraggingOver
                          //   ? "lightblue"
                          //   : "lightgrey",
                          minHeight: 100,
                          minWidth: 300,
                        }}
                      >
                        <Grid container>
                          <Grid item xs={9}>
                            <h2>{column.name}</h2>
                          </Grid>
                          <Grid item xs={3} style={{ marginTop: "1.5em" }}>
                            <AddIcon />
                            <MoreVertIcon />
                          </Grid>
                        </Grid>
                        {column.items.map((item, index) => {
                          return (
                            <Grid container spacing={3} key={item.id}>
                              <Grid item xs={12}>
                                <Draggable draggableId={item.id} index={index}>
                                  {(provided, snapshot) => {
                                    return (
                                      <Card
                                        onClick={() =>
                                          console.log("card clicked")
                                        }
                                        variant="outlined"
                                        className={classes.root}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",

                                          backgroundColor: snapshot.isDragging
                                            ? "#FAFAFA"
                                            : "#FFFFFF",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <TaskCard
                                          onClasses={classes}
                                          onItem={item}
                                        />
                                      </Card>
                                    );
                                  }}
                                </Draggable>
                              </Grid>
                            </Grid>
                          );
                        })}
                        {provided.placeholder}
                      </Grid>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </Grid>
  );
};

export default Tasks;

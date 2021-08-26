import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { TaskData } from "./Components/TaskData";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import CardComponent from "./Components/CardComponent";

// const itemsFromBackend = [
//   { id: uuid(), content: "First task" },
//   { id: uuid(), content: "Second task" },
//   { id: uuid(), content: "Third task" },
//   { id: uuid(), content: "Fourth task" },
//   { id: uuid(), content: "Fifth task" },
// ];

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

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
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
                            minHeight: 500,
                            minWidth: 300,
                          }}
                        >
                          <h2 style={{ textAlign: "center" }}>{column.name}</h2>
                          {column.items.map((item, index) => {
                            return (
                              <Grid container spacing={3} key={item.id}>
                                <Grid item xs={12}>
                                  <Draggable
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      console.log('PROVIDED', provided);
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
                                                ? "#F0F0F0"
                                                : "#FFFFFF",
                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            <CardComponent 
                                              onProvided={provided} 
                                              onClasses={classes} 
                                              onItem={item} 
                                              onSnapshot={snapshot}
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
    </Container>
  );
}

export default App;

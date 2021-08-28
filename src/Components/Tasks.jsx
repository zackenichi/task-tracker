import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import uuid from "uuid/v4";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TaskCard from "./TaskCard";
import TaskContext from "../context/task-context"; 

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
  const taskCtx = useContext(TaskContext)
  const [columns, setColumns] = useState([]);
  const classes = useStyles();

  useEffect(()=>{

    // I put it in here because context any react hooks can only be used inside a react component
    // react-context is also uses a react hook "useContext"
    const columnsFromBackEnd = {
      [uuid()]: {
        name: "To do",
        items: taskCtx.todo,
      },
      [uuid()]: {
        name: "In Progress",
        items: taskCtx.inProgress,
      },
      [uuid()]: {
        name: "Done",
        items: taskCtx.done,
      },
    }

    setColumns(columnsFromBackEnd)

    // will trigger a remount with useEffect after every changes in the dependency which is 'taskCtx'
  },[taskCtx])


  const setColumnsFunction =(props)=>{
    const newTasks = {
      newTodos: [],
      newInProgress: [],
      newDone: [],
    }

    // Object.keys === similar to for loop
    Object.keys(props).forEach((objectKey)=>{
      const column = props[objectKey]

      if(column.name === 'To do') {
        const newTodosArray = column.items
        newTasks.newTodos = newTodosArray;
      }

      if(column.name === 'In Progress') {
        const newInProgressArray = column.items
        newTasks.newInProgress = newInProgressArray
      }

      if(column.name === 'Done') {
        const newDoneArray = column.items
        newTasks.newDone = newDoneArray
      }

    })

    taskCtx.updateAllTasks(newTasks)
    setColumns(props)
  }

  return (
    <Grid container direction="row" justifyContent="center" spacing={3}>
      <DragDropContext
        onDragEnd={(result) => {
          //This is where you update the tasks context state
          //The new columns will be passed the the setColumnsFunction as an argument prop
          return onDragEnd(result, columns, setColumnsFunction)
        }}
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

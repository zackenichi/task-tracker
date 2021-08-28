import React, {useState, useEffect} from 'react';
import { TaskData } from '../Components/TaskData';
import { TASK_STATUS } from '../enums/takStatus';

// 1.) create context and template for props
export const TaskContext = React.createContext({
  todo: [],
  inProgress: [],
  done: [],
  moveTodo: (task)=>{},
  moveInProgress: (task)=>{},
  moveToDone: (task)=>{},
  deleteTask: (taskContainerName, taskId)=>{},
  addNewTask: (newTask)=>{},
  updateAllTasks: ({todo, inProgress, done}) => {

  }
})

// 2.) will wrap this around the index to provide all state to the app
// reference in '/src/index.js'
export const TaskContextProvider = (props) => {

  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  // 3.) upon mounting, this will trigger to set all state with value
  useEffect(()=>{
    // 4.) pretend fetch task in database
    const initialTasks = TaskData

    const initialTodo = initialTasks.filter(taskItem=>{
      return taskItem.status === 'to do'
    })
    
    const initialInProgress = initialTasks.filter(taskItem=>{
      return taskItem.status === 'in progress'
    })

    const initialDone = initialTasks.filter(taskItem=>{
      return taskItem.status === 'done'
    })

    // 5.) set initial data into the state
    setTodo(initialTodo);
    setInProgress(initialInProgress);
    setDone(initialDone); 
  },[])


  const deleteTask = ( taskContainerName, taskId ) => {
    if ( taskContainerName === TASK_STATUS.todo ) {
      setTodo((prevState)=>{
        return prevState.filter(task=>{
          return task.id !== taskId;
        })
      })
    }

    if ( taskContainerName === TASK_STATUS.inProgress ) {
      setInProgress((prevState)=>{
        return prevState.filter(task=>{
          return task.id !== taskId;
        })
      })
    }

    if ( taskContainerName === TASK_STATUS.done ) {
      setDone((prevState)=>{
        return prevState.filter(task =>{
          return task.id !== taskId;
        })
      })
    }
  }


  const addNewTask = ( newTask ) => {
    console.log('newTask', newTask)
    if ( newTask.status === TASK_STATUS.todo ) {
      setTodo((prevState)=>{
        return [...prevState, newTask]
      })
    }

    if ( newTask.status === TASK_STATUS.inProgress ) {
      setInProgress((prevState)=>{
        return [...prevState, newTask]
      })
    }

    if ( newTask.status === TASK_STATUS.done ) {
      setDone((prevState)=>{
        return [...prevState, newTask]
      })
    }
  }

  const updateAllTasks = (newTasks) => {
    const {newTodos, newInProgress, newDone} = newTasks
    setTodo(newTodos);
    setInProgress(newInProgress);
    setDone(newDone);

    console.log('NEW-TASKS', newTasks);
  }

  // 6.) pass value to the app with context
  // 7.) to use in the app, useContext(TaskContext)
  // reference of use, in '/src/Components/Pages/Tasks.js'
  return (
    <TaskContext.Provider
      value={{
        todo,
        inProgress,
        done,
        deleteTask,
        addNewTask,
        updateAllTasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;

// STATES
// => todo
// => inProgress
// => done

// FUNCTIONS
// to add new task function 
// => addNewTask()

// to delete a task function
// => deleteTask()

// to updated all task
// => updateAlltask()


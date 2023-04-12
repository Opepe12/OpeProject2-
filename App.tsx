import * as React from 'react';
import { Fragment, useState } from 'react';
import './style.css';
import Dialog from './Components/CreateDialog';
import TaskList from './Components/TaskList';
import Navbar from './Components/NavigationBar';
import { Task } from './types';
import { Snackbar, Alert } from '@mui/material';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [curTask, setCurTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const handleOpenDialog = (): void => {
    setDialogOpen(true);
  };
  const handleCloseDialog = (): void => {
    setDialogOpen(false);
  };
  const showToast = (message: string) => {
    setSuccessToastOpen(true);
    setToastMessage(message);
  };
  const addTask = (newTask: Task): void => {
    setTasks([...tasks, newTask]);
    showToast('Successfully Added!');
  };
  const updateTask = (editedTask: Task): void => {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id === editedTask.id) {
        return {
          ...task,
          ...editedTask,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    showToast('Successfully Updated!');
  };
  const deleteTask = (selectedTask: Task): void => {
    const updatedTasks: Task[] = tasks.filter(
      (task) => task.id !== selectedTask.id
    );
    setTasks(updatedTasks);
    showToast('Sucessfully Deleted!');
  };
  const openDialog = (): void => {
    setCurTask(null);
    handleOpenDialog();
  };
  const openEditDialog = (selectedTask: Task): void => {
    setCurTask(selectedTask);
    handleOpenDialog();
  };
  const setTaskComplete = (selectedTask: Task, checked: boolean): void => {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          isComplete: checked,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    showToast('Successfully Updated');
  };
  const closeSucessToast = () => {
    setSuccessToastOpen(false);
  };
  return (
    <Fragment>
      <Navbar openDialog={openDialog} />
      <Dialog
        open={dialogOpen}
        addTask={addTask}
        updateTask={updateTask}
        handleClose={handleCloseDialog}
        task={curTask}
        existingTaskTitles={tasks.map((task) => task.title)}
      />
      <TaskList
        tasks={tasks}
        openEditDialog={openEditDialog}
        deleteTask={deleteTask}
        setTaskComplete={setTaskComplete}
      />
      <Snackbar
        open={successToastOpen}
        autoHideDuration={7000}
        onClose={closeSucessToast}
      >
        <Alert
          onClose={closeSucessToast}
          severity="success"
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}


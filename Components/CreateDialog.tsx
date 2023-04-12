import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Task } from '../../types';

interface CreateDialogProps {
  open: boolean;
  addTask: (newTask: Task) => void;
  updateTask: (editedTask: Task) => void;
  handleClose: () => void;
  task: Task | null;
  existingTaskTitles: string[];
}
const CreateDialog = ({
  open,
  addTask,
  updateTask,
  handleClose,
  task,
  existingTaskTitles,
}: CreateDialogProps) => {
  const theme = useTheme();
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [priority, setPriority] = useState(task ? task.priority : 'low');
  const [deadline, setDeadline] = useState<Date>(
    task ? task.deadline : new Date()
  );
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDeadline(task.deadline);
    } else {
      resetStates();
    }
  }, [task]);
  const resetStates = (): void => {
    setTitle('');
    setDescription('');
    setPriority('low');
    setDeadline(new Date());
  };
  const closeDialog = (): void => {
    resetStates();
    handleClose();
  };
  const saveTask = (): void => {
    const editingTask: Task = {
      id: task ? task.id : title + Date.now(),
      title,
      description,
      deadline,
      priority,
      isComplete: false,
    };
    if (task) {
      updateTask(editingTask);
    } else {

      addTask(editingTask);
    }
    handleClose();
    resetStates();
  };
  const existedTitle = (title: string): boolean => {
    const duplicateTitle = existingTaskTitles.indexOf(title) !== -1;
    if (task) {
      return task.title !== title && duplicateTitle;
    }
    return duplicateTitle;
  };
  const getTitleErrorText = (title: string): string => {
    let errorText = '';
    if (!title) {
      errorText = 'Title is Required';
    } else if (existedTitle(title)) {
      errorText = 'Task Already Existed';
    }
    return errorText;
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle
        sx={{
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {
          task ? (
            <EditIcon sx={{ marginRight: '5px' }} />
          ) : (
            <AddCircleIcon sx={{ marginRight: '5px' }} />
          )
        }
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {
            // Conditional rendering of task title (edit or add)
            task ? 'Edit' : 'Add'
          }{' '}
          Task
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: '20px' }}>
          <TextField
            required
            id="title"
            label="Title"
            type="text"
            value={title}
            error={!title || existedTitle(title)}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '10px' }}
            onChange={(e) => setTitle(e.target.value)}
            helperText={getTitleErrorText(title)}
          />
          <TextField
            required
            id="description"
            label="Description"
            type="text"
            value={description}
            error={!description}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '10px' }}
            onChange={(e) => setDescription(e.target.value)}
            helperText={!description && 'Description is Required'}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={(newDeadline) => {
                newDeadline && setDeadline(newDeadline);
              }}
              disablePast
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <br />
          <FormControl sx={{ marginTop: '10px' }} fullWidth>
            <FormLabel id="priority-radio-buttons-group-label">
              Prority
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="priority-radio-buttons-group-label"
              defaultValue="low"
              name="radio-buttons-group"
              sx={{ justifyContent: 'space-between' }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="med" control={<Radio />} label="Med" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          startIcon={task ? <EditIcon /> : <AddCircleIcon />}
          onClick={saveTask}
          disabled={!title || !description || existedTitle(title)}
        >
          {task ? 'Edit' : 'Add'}
        </Button>
        <Button
          variant="contained"
          startIcon={<BlockIcon />}
          onClick={closeDialog}
          color="error"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateDialog;

import * as React from 'react';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from '@mui/material';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  openEditDialog: (selectedTask: Task) => void;
  deleteTask: (selectedTask: Task) => void;
  setTaskComplete: (selectedTask: Task, checked: boolean) => void;
}
const TaskList = ({
  tasks,
  openEditDialog,
  deleteTask,
  setTaskComplete,
}: TaskListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Is Complete</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {moment(task.deadline.toString()).format('MM/DD/YY')}
              </TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={task.isComplete}
                  inputProps={{
                    'aria-labelledby': task.title,
                  }}
                  onChange={(e) => {
                    setTaskComplete(task, e.target.checked);
                  }}
                />
              </TableCell>
              <TableCell>
                <div style={{ display: 'grid' }}>
                  {!task.isComplete && (
                    <Button
                      variant="contained"
                      startIcon={<NoteAltOutlinedIcon />}
                      onClick={() => {
                        openEditDialog(task);
                      }}
                      sx={{ marginBottom: '5px' }}
                    >
                      Update
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    startIcon={<HighlightOffIcon />}
                    onClick={() => {
                      deleteTask(task);
                    }}
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TaskList;

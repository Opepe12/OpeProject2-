import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as React from 'react';
interface CreateButtonProps {
  onClick: () => void;
}
const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <Button variant="contained" startIcon={<AddCircleIcon />} onClick={onClick}>
      Add
    </Button>
  );
};
export default CreateButton;
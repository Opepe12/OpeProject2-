import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import NewButton from '../Components/CreateButton';
interface NavigationBarProps {
  openDialog: () => void;
}
const NavigationBar = ({ openDialog }: NavigationBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Container
            sx={{ display: 'flex', alignItems: 'center', width: 'fit-content' }}
          >
            <MenuIcon sx={{ marginRight: '5px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FRAMEWORKS
            </Typography>
          </Container>
          <NewButton onClick={openDialog} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;

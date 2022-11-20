import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddModal(props) {
  const [open, setOpen] = React.useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <>

<AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" sx={{ display: 'block' } } />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Search by division or section"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'default' },
              }}
              type = "search"
              variant="standard"
              
            />
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ mr: 1 }}
            onClick = {handleOpen}
            >
              Add Division
            </Button>
            <Tooltip title="Reload">
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
      
      </AppBar>

    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
          Add Division
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="standard-basic" label="Division" variant='standard' fullWidth/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="standard-basic" label="Description" variant='standard' fullWidth />
          </Typography>

          <Stack direction="row" justifyContent={'center'} spacing={2} paddingTop="20px">
          <Button variant="contained" size='small'> ADD </Button>
          <Button variant="contained" bgcolor="alerts" size='small' onClick={handleClose}> CANCEL </Button>
          </Stack>

        </Box>
      </Modal>
    </div>
    </>
  );
}
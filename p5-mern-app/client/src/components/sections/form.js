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

import axios from 'axios'
import { useDispatch } from 'react-redux';

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

export default function AddModalSection(props) {
  const [open, setOpen] = React.useState(false);
  const [section, setSection] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [inputing, setInputing] = React.useState('')

  const handleOpen = () => {
    props.handleAdd('Cancel')
  }

  const handleCancel = () => {
    if (props.action === 'Edit') {
      props.handleEdit('Cancel')
    } else if (props.action === 'Add') {
      props.handleAdd('Cancel')
    }
  }

  const handleSave = () => {
    if (props.action === 'Edit') {
      props.handleEdit(props.current.row.id, {
        division: props.current.row.division,
        section: section,
        sectionDesc: description
      })
    } else if (props.action === 'Add') {
      props.handleAdd({
        division: props.currentDivision.row.id,
        section: section,
        sectionDesc: description
      })
    }
  }

  React.useEffect(() => {
    if (props.addStatus === 204) {
      setOpen(false);
      props.emptyStatus()
    }
    if (props.action === 'Edit') {
      if (!inputing) {
        setSection(props.current.row.section)
        setDescription(props.current.row.descriptions)
        setOpen(true);
        setInputing(true)
      }
    } else if (props.action === 'Add') {
      if (!inputing) {
        setSection('')
        setDescription('')
        setOpen(true);
        setInputing(true)
      }
    } else {
      setOpen(false);
      setInputing(false)
    }
  })

  const [searchValue, setSearchValue] = React.useState('')
  const handleSearch = (e) => {
    if (e.target.value === undefined) {
      setSearchValue('')
      props.handleSearch('')
    } else {
      setSearchValue(e.target.value)
      props.handleSearch(e.target.value)
    }
  }

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Typography sx={{fontSize: 20, fontWeight:'300', textAlign:'center', background:'#fff', paddingBottom:2}}>
          {props.currentDivision.row.division + ' - ' + props.currentDivision.row.descriptions}
        </Typography>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by section"

                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                  endAdornment: searchValue && (
                    <Tooltip title="Reload">
                      <IconButton onClick={e => {
                        handleSearch(e)
                      }}>
                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                      </IconButton>
                    </Tooltip>
                  )
                }}

                onChange={e => handleSearch(e)}
                type="text"
                variant="standard"
                value={searchValue}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}
                onClick={handleOpen}
              >
                Add Section
              </Button>
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
          <form onSubmit={e => e.preventDefault()}>
            <Box sx={style} >
              <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                {props.action + ' Section'}
              </Typography>
              <Stack spacing={2}>

                <TextField
                  id="standard-basic"
                  label="Section"
                  variant='standard'
                  fullWidth
                  value={section}

                  onChange={e => {
                    e.preventDefault()
                    setSection(e.target.value)
                  }} />
                <TextField
                  id="standard-basic"
                  label="Description"
                  variant='standard'
                  fullWidth
                  value={description}
                  onChange={e => {
                    e.preventDefault()
                    setDescription(e.target.value)
                  }} />
              </Stack>


              <Stack direction="row" justifyContent={'center'} spacing={2} paddingTop="20px">
                <Button variant="contained" size='small'
                  onClick={e => {
                    e.preventDefault()
                    handleSave()
                  }
                  }> Save </Button>
                <Button variant="contained" bgcolor="alerts" size='small' onClick={handleCancel}> CANCEL </Button>
              </Stack>

            </Box>
          </form>
        </Modal>
      </div>
    </>
  );
}
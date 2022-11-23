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
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  maxHeight: 600,
};


// {
//   employee_id: '',
//   name: {
//     lastname: '',
//     firstname: '',
//     middlename: '',
//     extension: ''
//   },
//   position: '',
//   username: '',
//   password: '',
//   division: '',
//   section: '',
//   isDivisionHead: false,
//   isSectionHead: false,
//   isAdmin: false
// }

export default function AddModal(props) {
  const dispatch = new useDispatch()
  const divisions = useSelector(state => state.dataDivisions)
  const sections = useSelector(state => state.dataSections)

  const [open, setOpen] = React.useState(false);
  const [employee_id, setEmployeeId] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const [firstname, setFirstname] = React.useState('')
  const [middlename, setMiddlename] = React.useState('')
  const [extension, setExtension] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repassword, setRePassword] = React.useState('')
  const [division, setDivision] = React.useState('')
  const [section, setSection] = React.useState('')
  const [isDivisionHead, setIsDivisionHead] = React.useState(false)
  const [isSectionHead, setIsSectionHead] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [inputing, setInputing] = React.useState('')
  const [resetPassword, setResetPassword] = React.useState(false)

  const handleLoadDivisions = () => { //load all data
    axios.get('http://localhost:8080/divisions/')
      .then(result => {
        dispatch({ type: 'LOAD_DIVISIONS', payload: result.data })
      })
  }

  React.useEffect(() => {
    handleLoadDivisions()
  }, [])

  const handleLoadSections = () => { //load all data
    axios.get('http://localhost:8080/sections/')
      .then(result => {
        dispatch({ type: 'LOAD_SECTIONS', payload: result.data })
      })
      .catch(console.log())
  }

  React.useEffect(() => {
    handleLoadSections()
  }, [])

  const handleOpen = () => {
    props.handleAdd('Cancel')
  }

  const userField = ({
    employee_id: employee_id,
    name: {
      lastname: lastname,
      firstname: firstname,
      middlename: middlename,
      extension: extension
    },
    position: position,
    username: username,
    password: password,
    division: division,
    section: section,
    isDivisionHead: isDivisionHead,
    isSectionHead: isSectionHead,
    isAdmin: isAdmin
  })

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
        employee_id: employee_id,
        name: {
          lastname: lastname,
          firstname: firstname,
          middlename: middlename,
          extension: extension
        },
        position: position,
        username: username,
        division: division,
        section: section,
        isDivisionHead: isDivisionHead,
        isSectionHead: isSectionHead,
        isAdmin: isAdmin
      })
    } else if (props.action === 'Add') {
      props.handleAdd({
        employee_id: employee_id,
        name: {
          lastname: lastname,
          firstname: firstname,
          middlename: middlename,
          extension: extension
        },
        position: position,
        username: username,
        password: password,
        division: division,
        section: section,
        isDivisionHead: isDivisionHead,
        isSectionHead: isSectionHead,
        isAdmin: isAdmin
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
        setEmployeeId(props.current.row.empid)
        setLastname(props.current.row.lastname)
        setFirstname(props.current.row.firstname)
        setMiddlename(props.current.row.middlename)
        setExtension(props.current.row.extension)
        setPosition(props.current.row.position)
        setUsername(props.current.row.username)
        setDivision(props.current.row.division)
        setSection(props.current.row.section)
        setIsDivisionHead(props.current.row.isDivisionHead)
        setIsSectionHead(props.current.row.isSectionHead)
        setIsAdmin(props.current.row.isAdmin)

        setOpen(true);
        setInputing(true)
      }
    } else if (props.action === 'Add') {
      if (!inputing) {
        setOpen(true);
        setInputing(true)
      }
    } else {
      setEmployeeId('')
      setLastname('')
      setFirstname('')
      setMiddlename('')
      setExtension('')
      setPosition('')
      setUsername('')
      setPassword('')
      setRePassword('')
      setDivision('')
      setSection('')
      setIsDivisionHead(false)
      setIsSectionHead(false)
      setIsAdmin(false)
      setOpen(false);
      setInputing(false)
      setResetPassword(false)
    }
  })

  const [searchValue, setSearchValue] = React.useState('')
  const handleSearch = (e) => {
    console.log(e.target.value)
    if (e.target.value === undefined) {
      setSearchValue('')
      props.handleSearch('')
    } else {
      setSearchValue(e.target.value)
      props.handleSearch(e.target.value)
    }
  }

  const [readOnlyProps, setReadOnlyProps] = React.useState(false)
  const handleResetPassword = (e) => {
    setResetPassword(e.target.checked)
    
   if (props.action === 'Edit' && !resetPassword) {
    setReadOnlyProps(true)
   } else {
    setReadOnlyProps(false)
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
                Add User
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
                {props.action + ' User'}
              </Typography>
              <Stack spacing={2}>

                <Box sx={{ margin: 1 }}>
                  <hr
                    style={{
                      background: 'blue',
                      color: 'blue',
                      height: '3px',
                    }} />
                  <FormControl sx={{ margin: 1, width: '100%' }}>
                    <TextField
                      id="standard-basic"
                      label="Employee No."
                      variant='standard'
                      fullWidth
                      value={employee_id}
                      onChange={e => {
                        setEmployeeId(e.target.value)
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <Box sx={{ color: 'text.secondary' }}>Name</Box>
                  <Box sx={{ paddingLeft: '20px', display: 'inline-block' }}>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="First Name"
                        variant='standard'
                        fullWidth
                        value={firstname}
                        onChange={e => {
                          setFirstname(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Last Name"
                        variant='standard'
                        fullWidth
                        value={lastname}
                        onChange={e => {

                          setLastname(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Middle Name"
                        variant='standard'
                        fullWidth
                        value={middlename}
                        onChange={e => {
                          setMiddlename(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Name Extension"
                        variant='standard'
                        value={extension}
                        onChange={e => setExtension(e.target.value)}

                      />
                    </FormControl>
                  </Box>
                </Box>
                <hr
                  style={{
                    background: 'blue',
                    color: 'blue',
                    height: '3px',
                  }} />
                <Box sx={{ margin: 1 }}>
                  <FormControl sx={{ margin: 1 }}>
                    <TextField
                      id="standard-basic"
                      label="Position"
                      variant='standard'
                      sx={{ minWidth: '300px' }}
                      value={position}
                      onChange={e => setPosition(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ margin: 1 }}>
                  <FormControl sx={{ margin: 1 }}>
                    <InputLabel htmlFor="division">Division</InputLabel>
                    <Select
                      sx={{ minWidth: '200px' }}
                      inputProps={{
                        name: 'division',
                        id: 'division',
                      }}
                      native
                      variant='standard'
                      value={division}
                      onChange={e => setDivision(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      {
                        divisions.map(item => {
                          return (
                            <option key={item._id} value={item._id}>{item.division + ' - ' + item.div_description}</option>
                          )

                        })
                      }
                    </Select>
                  </FormControl>
                  <FormControl sx={{ margin: 1 }}>
                    <InputLabel htmlFor="section">Section</InputLabel>
                    <Select
                      sx={{ minWidth: '200px' }}
                      inputProps={{
                        name: 'section',
                        id: 'section',
                      }}
                      native
                      variant='standard'
                      value={section}
                      onChange={e => setSection(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      {

                        sections.filter(item => item.division.toString() === division.toString()).map(item => {
                          return (
                            <option key={item._id} value={item._id}>{item.section + ' - ' + item.sectionDesc}</option>
                          )

                        })
                      }
                    </Select>
                  </FormControl>
                </Box>
                <hr
                  style={{
                    background: 'blue',
                    color: 'blue',
                    height: '3px',
                  }} />
                <Box sx={{ paddingLeft: '20px', display: 'inline-block' }}>
                  <Box>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Username"
                        variant='standard'
                        fullWidth
                        inputProps={props.action === 'Edit' &&
                          { readOnly: true, }
                        }
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        inputProps={{ 'aria-label': 'ResetPassword' }}
                        checked={resetPassword}
                        onChange={e => handleResetPassword(e)}
                      />
                    }
                    label="Reset Password"
                    sx={{ margin: 1 }}
                  />
                  </Box>

                  <FormControl sx={{ margin: 1 }}>
                    <TextField
                      id="standard-basic"
                      label="Password"
                      variant='standard'
                      fullWidth
                      inputProps={
                        { readOnly: readOnlyProps, }
                      }
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormControl sx={{ margin: 1 }}>
                    <TextField
                      id="standard-basic"
                      label="Re-type Password"
                      variant='standard'
                      fullWidth
                      inputProps={
                        { readOnly: readOnlyProps, }
                      }
                      value={repassword}
                      onChange={e => setRePassword(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ margin: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        inputProps={{ 'aria-label': 'isDivisionHead' }}
                        checked={isDivisionHead}
                        onChange={e => setIsDivisionHead(e.target.checked)}
                      />
                    }
                    label="isDivisionHead"
                    sx={{ margin: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        inputProps={{ 'aria-label': 'isSectionHead' }}
                        checked={isSectionHead}
                        onChange={e => setIsSectionHead(e.target.checked)}
                      />
                    }
                    label="isSectionHead"
                    sx={{ margin: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        inputProps={{ 'aria-label': 'isAdmin' }}
                        checked={isAdmin}
                        onChange={e => setIsAdmin(e.target.checked)}
                      />
                    }
                    label="isAdmin"
                    sx={{ margin: 1 }}
                  />
                </Box>

                <hr
                  style={{
                    background: 'blue',
                    color: 'blue',
                    height: '3px',
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
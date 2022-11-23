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
  const users = useSelector(state => state.dataUsers)
  const currentUser = useSelector(state => state.dataCurrentUser)

  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState('')
  const [travelorderno, setTravelOrderNo] = React.useState('')
  const [travelorderdate, setTravelOrderDate] = React.useState('')
  const [departure, setDeparture] = React.useState('')
  const [arrival, setArrival] = React.useState('')
  const [objectives, setObjectives] = React.useState('')
  const [transpo, setTranspo] = React.useState([])
  const [itinerary, setItinerary] = React.useState([])
  const [status, setStatus] = React.useState('')
  const [inputing, setInputing] = React.useState('')
  const [resetPassword, setResetPassword] = React.useState(false)


  const handleLoadDivisions = () => { //load all data
    axios.get('http://localhost:8080/users/')
      .then(result => {
        dispatch({ type: 'LOAD_USERS', payload: result.data })
      })
  }

  React.useEffect(() => {
    handleLoadDivisions()
  }, [])

  const handleOpen = () => {
    props.handleAdd('Cancel')
  }

  const toFields = ({
    employee: employee,
    travelorderno : travelorderno,
    travelorderdate : travelorderdate,
    traveldate : {
      departure : departure,
      arrival : arrival
    },
    objectives : objectives,
    transpo : transpo,
    itinerary : itinerary,
    status : status,
    createdby : currentUser._id
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
      props.handleEdit(props.current.row.id, toFields)
    } else if (props.action === 'Add') {
      props.handleAdd(toFields)
    }
  }

  React.useEffect(() => {
    if (props.addStatus === 204) {
      setOpen(false);
      props.emptyStatus()
    }
    if (props.action === 'Edit') {
      if (!inputing) {
        setEmployee(props.current.row.employee)
        setTravelOrderNo(props.current.row.travelorderno)
        setTravelOrderDate(props.current.row.travelorderdate)
        setDeparture(props.current.row.traveldateDeparture)
        setArrival(props.current.row.traveldateArrival)
        setObjectives(props.current.row.objectives)
        setTranspo(props.current.row.transpo)
        setItinerary(props.current.row.itinerary)
        setStatus(props.current.row.status)
        
        setOpen(true);
        setInputing(true)
      }
    } else if (props.action === 'Add') {
      if (!inputing) {
        setOpen(true);
        setInputing(true)
      }
    } else {
      setEmployee('')
        setTravelOrderNo('')
        setTravelOrderDate('')
        setDeparture('')
        setArrival('')
        setObjectives('')
        setTranspo('')
        setItinerary('')
        setStatus('')

      setOpen(false);
      setInputing(false)
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
                Add Travel Order
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
                {props.action + ' Travel Order'}
              </Typography>
              <Stack spacing={2}>

                <Box sx={{ margin: 1 }}>
                  <hr
                    style={{
                      background: 'blue',
                      color: 'blue',
                      height: '3px',
                    }} />
                  <FormControl sx={{ margin: 1 }}>
                    <InputLabel htmlFor="section">Employee Name</InputLabel>
                    <Select
                      sx={{ minWidth: '200px' }}
                      inputProps={{
                        name: 'employee',
                        id: 'employee',
                      }}
                      native
                      variant='standard'
                      value={employee}
                      onChange={e => setEmployee(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      {

                        users.map(item => {
                          return (
                            <option key={item._id} value={item._id}>{item.name.lastname + ',  ' + item.name.firstname + ' ' + item.name.middlename}</option>
                          )

                        })
                      }
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <Box sx={{ color: 'text.secondary' }}>Employee</Box>
                  <Box sx={{ paddingLeft: '20px', display: 'inline-block' }}>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Travel Order No."
                        variant='standard'
                        fullWidth
                        value={travelorderno}
                        onChange={e => {
                          setTravelOrderNo(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Travel Order Date"
                        variant='standard'
                        fullWidth
                        value={travelorderdate}
                        onChange={e => {

                          setTravelOrderDate(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Depature"
                        variant='standard'
                        fullWidth
                        value={departure}
                        onChange={e => {
                          setDeparture(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ margin: 1 }}>
                      <TextField
                        id="standard-basic"
                        label="Arrival"
                        variant='standard'
                        value={arrival}
                        onChange={e => setArrival(e.target.value)}

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
                      label="Objectives"
                      variant='standard'
                      sx={{ minWidth: '300px' }}
                      value={objectives}
                      onChange={e => setObjectives(e.target.value)}
                    />
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
                        label="Mean of Transportation"
                        variant='standard'
                        fullWidth
                        value={transpo}
                        onChange={e => setTranspo(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  </Box>

                  
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
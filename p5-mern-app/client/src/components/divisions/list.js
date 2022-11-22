import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// START=================== Material UI ========================//
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { createStyles, makeStyles } from "@mui/styles";
import { Button, Grid, IconButton, Link, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
//import PrintIcon from '@mui/icons-material/Print'
import DeleteIcon from '@mui/icons-material/Delete';
//import PlusIcon from '@mui/icons-material/AddBox'
//import PDFIcon from '@mui/icons-material/PictureAsPdf'
import DetailIcon from '@mui/icons-material/ReadMore'
import Fab from '@mui/material/Fab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Popper } from '@mui/material';
// END=================== Material UI =========================//

// START=================== Component/s ========================//
import AddModal from "./form";
import DataTableSection from '../sections/list';
import { getValue, height } from '@mui/system';
// END===================== Component/s ========================//

// START================ Material UI Style =======================//
const useStyles = makeStyles((theme) => //Data grid style
  createStyles({
    root: {}
  })
);
// END================= Material UI Style =======================//

const handleClick = (event, cellValues) => {
  console.log(cellValues.row);
};

const handleCellClick = (param, event) => {
  event.stopPropagation();
};

const handleRowClick = (param, event) => {
  event.stopPropagation();
};

function createData(id, division, descriptions, sections) {
  return {
    id,
    division,
    descriptions,
    sections
  };
}

function CustomToolbar() { //row density
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

// START====================== Expand Cell Value ===========================//
function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: 'offsetHeight' }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  colDef: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

// END======================== Expand Cell Value ===========================//

const DataTableDivision = () => {

  const classes = useStyles();
  const data = useSelector(state => state.dataDivisions.map(item => createData(item._id, item.division, item.div_description,
    item.sections.map(section => section.section).join(', '))
  ))

  const [addStatus, setAddStatus] = React.useState()
  const [pageSize, setPageSize] = React.useState(5);
  const [action, setAction] = React.useState('')
  const [current, setCurrent] = React.useState({})
  const [rows, setRows] = React.useState([])
  const [search, setSearch] = React.useState(false)

  const dispatch = new useDispatch()

  // START============================= Columns Setting =================================//
  const columns = [
    {
      field: "Edit",
      width: 70,
      headerAlign: 'center',
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Fab size='small' color='secondary'>
            <EditIcon
              onClick={(event) => {
                handleEdit(event, cellValues);
              }}
            />
          </Fab>
        )
      }
    },
    {
      field: "Delete",
      width: 70,
      headerAlign: 'center',
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Fab size='small' color='warning'>
            <DeleteIcon
              onClick={(event) => {
                if (window.confirm('Are you sure you want to delete ' + cellValues.row.division)) { handleDelete(event, cellValues) };
              }}
            />
          </Fab>
        );
      }
    },
    {
      field: "id",
      headerAlign: 'center',
      headerName: "ID",
      hideable: false,
    },
    {
      field: "divisions",
      headerAlign: 'center',
      align: "center",
      headerName: "Divisions",
      minWidth: 100, 
      renderCell: renderCellExpand,
      flex: 1,
      renderCell : (cellValues) => {
        return (
          <Grid>
            <Typography>
            { cellValues.row.division}
            </Typography>
          </Grid>
        )
      },

      
    },
    { 
      field: "descriptions", 
      headerName: "Descriptions", 
      headerAlign: 'center',
      allowTextWrap : true,
      flex: 1,
      renderCell: renderCellExpand,
      //, 
      // renderCell : (cellValues) => {
      //   return (
         
      //     // <div style={{overflow:'hidden', wrap:'no-wrap'}}>
      //     //   <Typography style={{overFlowWrap: 'break-word'}}>
      //     //   { cellValues.row.descriptions} hjsadflsadjkl jhlskjahdlkjshakld lksakl lkhlks akhjljlkjh jhlhlkhkllk 
      //     //   </Typography>
      //     // </div>
      //     <Grid item zeroMinWidth >
      //       <Typography style={{overflowWrap: 'break-word', allowTextWrap : true}}>
      //       { cellValues.row.descriptions} hjsadflsadjkl jhlskjahdlkjshakld lksakl lkhlks akhjljlkjh jhlhlkhkllk 
      //       </Typography> 
      //     </Grid>
      //   )
      //},
    },
    // {
    //   field: "sections", headerName: "Sections", width: 100, headerAlign: 'center', renderCell: renderCellExpand, flex: 1,
    // },
    {
      field: "section_details",
      headerName: "Sections",
      headerAlign : 'center',
      align: "left",
      renderCell: renderCellExpand,
      flex : 1,
      renderCell: (cellValues) => {
        return (
          
          <Grid>
          <IconButton onClick={(event) => {
            handleShowSection(event, cellValues);
          }}>
          <DetailIcon />
          </IconButton>
          {cellValues.row.sections}
          </Grid>
          
        )
      }
    }
  ];
  // END=============================== Columns Setting =================================//

  // START================================== CRUD =======================================//
  const handleLoadDivisions = () => { //load all data
    axios.get('http://localhost:8080/divisions/')
      .then(result => {
        dispatch({ type: 'LOAD_DIVISIONS', payload: result.data })
      })
      .catch(console.log())
  }

  React.useEffect(() => {
    handleLoadDivisions()
  }, [])

  const handleAdd = (newItem) => { //add new division
    if (action === '') {
      setAction('Add')
    } else if (action === 'Add' && newItem !== 'Cancel') {
      axios.post('http://localhost:8080/divisions/', newItem)
        .then(() => {
          alert('New divisions has been added')
          setAddStatus(204)
          handleLoadDivisions()
          setAction('')
        })
        .catch(error => {
          alert(error.response.data.errors.division.message)
          setAddStatus(400)
        })
    } else {
      setAction('')
    }
  }

  const handleEdit = (event, cellValues) => {
    if (action === 'Edit' && event !== 'Cancel') {
      axios.put(`http://localhost:8080/divisions/${event}`, cellValues)
        .then(() => {
          alert('Divisions has been updated')
          setAddStatus(204)
          handleLoadDivisions()
          setAction('')
        })
        .catch(error => {
          alert(error.response.data.errors.division.message)
          setAddStatus(400)
        })
      setAction('')

    } else if (action === '') {
      setAction('Edit')
      setCurrent(cellValues)
    } else {
      setAction('')
    }
  };

  const handleDelete = (event, cellValue) => {
    axios.delete(`http://localhost:8080/divisions/${cellValue.row.id}`)
      .then(() => {
        alert('Divisions has been deleted')
        setAddStatus(204)
        handleLoadDivisions()
        setAction('')
      })
      .catch(error => {
        alert(error.response.data.errors.division.message)
        setAddStatus(400)
      })
  }

  const emptyStatus = () => {
    setAddStatus()
  }
  // END==================================== CRUD =======================================//

  // START================================= Search =======================================//
  const handleSearch = (value) => {
    if (value === '') {
      setSearch(false)
    } else {
      setSearch(true)
      setRows(data.filter(item => {
        let division = item.division.toLowerCase()
        let desc = item.descriptions.toLowerCase()
        let section = item.sections.toLowerCase()
        let val = value.toLowerCase()

        return (
          division.includes(val) || desc.includes(val) || section.includes(val)
        )
      }
      ))
    }
  }
  // END=================================== Search =======================================//

  // START============================== Section Details =======================================//
  const [showSection, setShowSection] = React.useState(false)
  const handleShowSection = (event, cellValues) => {
    setShowSection(!showSection)
    setCurrent(cellValues)
  }

  const handleSectionClose = () => {
    setShowSection(!showSection)
    handleLoadDivisions()
  }
  // END================================ Section Details =======================================//

  return (
    <>
      {showSection && <DataTableSection
        current={current}
        handleSectionClose = {handleSectionClose}
      />}

      <AddModal handleAdd={handleAdd}
        addStatus={addStatus}
        emptyStatus={emptyStatus}
        current={current}
        handleEdit={handleEdit}
        action={action}
        handleSearch={handleSearch}
      />

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rowHeight={50}
          className={classes.root}
          rows={search === true ? rows : data}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
          columns={columns}
          allowTextWrap={true}
          pageSize={pageSize}
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
          disableColumnMenu={true}
          columnVisibilityModel={{ id: false }}
          density="comfortable"
          components={{
            Toolbar: CustomToolbar,
          }}

        />
      </div>
    </>
  )
}

export default DataTableDivision;
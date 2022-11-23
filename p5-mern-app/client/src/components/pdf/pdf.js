import { Box, Button, Modal, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PDFDocument } from './pdfdocument';
import { PDFViewer } from '@react-pdf/renderer';

// START================ Material UI Style =======================//
// END================= Material UI Style =======================//
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height : '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PDFVIew = (props) => {
  const [addStatus, setAddStatus] = React.useState()
  const [pageSize, setPageSize] = React.useState(5);
  const [action, setAction] = React.useState('')
  const [current, setCurrent] = React.useState({})
  const [rows, setRows] = React.useState([])
  const [search, setSearch] = React.useState(false)

  const dispatch = new useDispatch()

  // START============================= Columns Setting =================================//
  // END=============================== Columns Setting =================================//

  // START================================== CRUD =======================================//
  
  const emptyStatus = () => {
    setAddStatus()
  }
  // END==================================== CRUD =======================================//

  // START================================= Search =======================================//
  
  // END=================================== Search =======================================//

  // START============================== Section Details =======================================//
  const [showSection, setShowSection] = React.useState(false)

  const handleShowSection = () => {
    setShowSection(!showSection)
  }
  // END================================ Section Details =======================================//

  const handleSectionClose = () => {
    props.handleSectionClose()
  }

  console.log(current)
  return (
    <>

      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Tooltip title="Close">
            <Button
              aria-label="close"
              color='warning'
              onClick={handleSectionClose}
              sx={{
                position: 'absolute',
                right: 1,
                top: 2,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon color='warning' />
            </Button>
          </Tooltip>
          <React.Fragment>
          <PDFViewer width='100%' height='100%'>
              <PDFDocument current={props.current}/>
            </PDFViewer>
            
          </React.Fragment>
          
        </Box>
      </Modal>
    </>
  )
}

export default PDFVIew;
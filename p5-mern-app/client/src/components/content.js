import * as React from 'react';
import { Route, Routes} from 'react-router-dom';
import Paper from '@mui/material/Paper';

import DataTableDivision from './divisions/list';
import DataTableUsers from './users/list';
import DataTableTravelOrders from './travelorder/list';
import { useSelector } from 'react-redux';

export default function Content() {
  const page = useSelector(state => state.Page)
  console.log(page)
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'scroll' }}>
      { page === 'users' &&
        <DataTableUsers />
      } 
      
       { page === 'divisions' &&
        <DataTableDivision/>
      } 
      
      {page === 'travel orders' &&
        <DataTableTravelOrders />
      } 
      
    </Paper>
  );
}

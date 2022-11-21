import * as React from 'react';
import { Route, Routes} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import DataTableDivision from './divisions/list';

export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'scroll' }}>
      <Routes>
      <Route path='/users' element = {
        <div>Users</div>
      } 
      />
      <Route path='/divisions' element = {
        <DataTableDivision/>
      } 
      />
      <Route path='/travel orders' element = {
        <div>TO</div>
      } 
      />
      </Routes>
    </Paper>
  );
}

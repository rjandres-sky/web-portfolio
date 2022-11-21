import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DataTable from './divisions/list';

export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'scroll' }}>
      <DataTable/>
    </Paper>
  );
}

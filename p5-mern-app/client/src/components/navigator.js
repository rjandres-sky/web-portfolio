import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DocumentIcon from '@mui/icons-material/TravelExplore'
import DivisionIcon from '@mui/icons-material/SafetyDivider'

import PeopleIcon from '@mui/icons-material/People';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const categories = [
    {
        id: 'Menu',
        children: [
            {
                id: 'Users',
                icon: <PeopleIcon />
            },
            { id: 'Divisions', icon: <DivisionIcon /> },
            { id: 'Travel Orders', icon: <DocumentIcon />
             },
        ],
    }
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props;
    const dispatch = new useDispatch();

    const handlePage = (page) => {
        dispatch({type : 'CURRENTPAGE', payload : page})
        console.log(page)
    }

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Travel Order
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active }) => (
                            <ListItem disablePadding key={childId} >
                                <ListItemButton selected={active} sx={item} onClick={e => {e.preventDefault() 
                                handlePage(childId.toLowerCase())}}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}

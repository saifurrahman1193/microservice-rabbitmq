import React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

function DeleteActionMenuItem(props) {
    const { children, handler, ...domProps } = props;
    return (
        <MenuItem>
            <ListItemIcon>
                <DeleteIcon sx={{ marginRight: "10px", color: 'rgba(0, 0, 0, 0.54)' }} fontSize="small" />
            </ListItemIcon>
            <ListItemText>{children}</ListItemText>
        </MenuItem>
    )
}

export default DeleteActionMenuItem
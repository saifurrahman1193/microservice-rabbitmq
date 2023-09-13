import React from 'react'
import { MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

function DeleteActionMenuItem(props) {
    const { children, handler } = props;
    return (
        <MenuItem onClick={handler}><DeleteIcon color="error" style={{ marginRight: "10px" }} /> Delete</MenuItem>
    )
}

export default DeleteActionMenuItem
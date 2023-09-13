import React from 'react'
import { MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function EditActionMenuItem({ children, handler }) {
    return (
        <MenuItem onClick={handler} ><EditIcon color="primary" style={{ marginRight: "10px" }} /> {children}</MenuItem>
    )
}

export default EditActionMenuItem
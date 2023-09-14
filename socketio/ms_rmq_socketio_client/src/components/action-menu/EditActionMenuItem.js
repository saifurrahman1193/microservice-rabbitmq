import React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function EditActionMenuItem({ children, handler, ...domProps }) {
    return (
        <MenuItem onClick={handler}>
            <ListItemIcon>
                <EditIcon sx={{ marginRight: "10px", color: 'rgba(0, 0, 0, 0.54)' }} fontSize="small"  {...domProps}/>
            </ListItemIcon>
            <ListItemText {...domProps}>{children}</ListItemText>
        </MenuItem>
    )
}

export default EditActionMenuItem
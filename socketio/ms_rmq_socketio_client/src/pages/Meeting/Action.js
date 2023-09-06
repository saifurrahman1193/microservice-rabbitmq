import React, { useState } from 'react'
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'

export const ActionCell = (props) => {
    const {} = props;

    const handleAction = (rowData) => {
        // Implement the action logic here, using the rowData if needed
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><EditIcon  color="primary" style={{ marginRight: "10px" }} /> Edit</MenuItem>
                    <MenuItem onClick={handleClose}><DeleteIcon  color="error" style={{ marginRight: "10px" }} /> Delete</MenuItem>
                </Menu>
            </div>
        </>
    );
}

import React, { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import useConfirm from 'src/components/alert/confirm/useConfirm.js'
import { deleteCall } from 'src/services/api/apiService.js';
import { MEETING } from 'src/services/api/api_path/APIPath.js';

const Action = (props) => {
    const { data, handleGetMeetings, showAlert } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteProcess = () => {
        handleClose();
        confirmAlert('success', 'Delete Confirmation!', 'Are you sure you want to delete this record?', { button: { confirm: { label: 'Confirm' }, cancel: { label: 'Cancel' } } });
    }

    const confrimHandler = async (event) => {
        let response = await deleteCall(MEETING + '/' + data._id);

        if (response?.code === 200) {
            showAlert("Meeting deleted successfully!", "success", "top-right", 5000);
            handleGetMeetings();
        } else {
            showAlert(response?.message?.[0], "error", "top-right", 5000);
        }
    };

    const cancelHandler = () => {
        console.log('Cancel');
    };


    const { confirmAlert, ConfirmComponent } = useConfirm({ confrimHandler, cancelHandler });

    return (
        <>
            {ConfirmComponent} 

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
                <MenuItem onClick={handleClose}><EditIcon color="primary" style={{ marginRight: "10px" }} /> Edit</MenuItem>
                <MenuItem onClick={deleteProcess}><DeleteIcon color="error" style={{ marginRight: "10px" }} /> Delete</MenuItem>
            </Menu>
        </>
    );

}

export default Action;

import React, { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import useConfirm from 'src/components/alert/confirm/useConfirm.js'
import { deleteCall } from 'src/services/api/apiService.js';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { useAlert } from 'src/components/alert/timeout-alert/useAlert.js'

const Action = (props) => {
    const { data, handleGetMeetings } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteProcess = () => {
        handleClose();
        deleteConfirmAlert('success', 'Delete Confirmation!', 'Are you sure you want to delete this record?', { button: { confirm: { label: 'Confirm' }, cancel: { label: 'Cancel' } } });
    }

    const { showAlert: deleteShowAlert, AlertComponent: DeleteAlertComponent } = useAlert();



    const deleteConfrimHandler = async (event) => {
        let response = await deleteCall(MEETING + '/' + data._id);

        if (response?.code === 200) {
            deleteShowAlert("Meeting deleted successfully!", "success", "top-right", 5000);
            handleGetMeetings();
        } else {
            deleteShowAlert(response?.message?.[0], "error", "top-right", 5000);
        }
    };

    const deleteCancelHandler = () => {
        console.log('Cancel');
    };


    const { confirmAlert: deleteConfirmAlert, ConfirmComponent: DeleteConfirmComponent } = useConfirm({ confrimHandler: deleteConfrimHandler, cancelHandler: deleteCancelHandler });

    return (
        <>
            {DeleteConfirmComponent} {DeleteAlertComponent}

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

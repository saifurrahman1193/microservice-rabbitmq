import React, { useState, useRef } from 'react'
import { Menu, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useConfirm from 'src/components/alert/confirm/useConfirm.js'
import { deleteCall } from 'src/services/api/apiService.js';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import Update from 'src/pages/Meeting/Update.js';
import EditActionMenuItem from 'src/components/action-menu/EditActionMenuItem.js';
import DeleteActionMenuItem from 'src/components/action-menu/DeleteActionMenuItem.js';

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
        confirmAlert('warning', 'Are you sure?', 'Do you really want to delete this record?', { button: { confirm: { label: 'Yes, Delete' }, cancel: { label: "Don't Delete" } } });
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

    const childUpdateRef = useRef();
    const handleUpdateMeeting = () => {
        handleClose();
        childUpdateRef.current.handle_updateMeeting();
    }


    return (
        <>
            {ConfirmComponent}

            <Update ref={childUpdateRef} {...props} />

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
                <EditActionMenuItem handler={handleUpdateMeeting}>Edit</EditActionMenuItem>
                <DeleteActionMenuItem handler={deleteProcess}>Delete</DeleteActionMenuItem>
            </Menu>
        </>
    );

}

export default Action;

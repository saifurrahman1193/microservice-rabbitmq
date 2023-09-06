import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export const useConfirm = () => {

    const [confirmInitialData, setConfirmInitialData] = useState({
        title: 'Confirmirmation!',
        message: 'Are you sure you want to perform the action?',
        isOpen: false,
    });
    const [confirmData, setConfirmData] = useState(confirmInitialData);

    const confirmAlert = (title, message, isOpen=true) => {
        console.log(title, message);
        setConfirmData({
            title,
            message,
            isOpen: true,
        });
    };


    const confrimHandler = (event, reason) => {
        handleMeetingCreateDialogClose(event, reason)
    };

    const cancelHandler = (event, reason) => {
        handleMeetingCreateDialogClose(event, reason)
    };

    const handleMeetingCreateDialogClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;  // if backdrop/outside of dialog click then do nothing/don't close dialog. making sure the process is completed properly
        setConfirmData(setConfirmInitialData);
    };


    return {
        confirmAlert,
        ConfirmComponent: (
            <Dialog open={confirmData?.isOpen} onClose={cancelHandler} disableEscapeKeyDown>
                <DialogTitle>{confirmData?.title}</DialogTitle>
                <DialogContent>
                    {confirmData?.message}
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelHandler} color="error">
                        Cancel
                    </Button>
                    <Button onClick={confrimHandler} color="success">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

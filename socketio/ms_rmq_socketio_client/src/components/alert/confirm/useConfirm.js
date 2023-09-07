import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const useConfirm = () => {

    const [confirmInitialData, setConfirmInitialData] = useState({
        type: 'success', // Default type
        title: 'Confirmirmation!',
        message: 'Are you sure you want to perform the action?',
        isOpen: false,
        config: {
            button: { confirm: { label: 'Confirm' }, cancel: { label: 'Cancel' } }
        },
    });
    const [confirmData, setConfirmData] = useState(confirmInitialData);

    const confirmAlert = (type = 'success', title, message, config) => {
        console.log(type , title, message, config);
        setConfirmData({
            type,
            title,
            message,
            isOpen: true,
            config
        });
    };


    const confrimHandler = (event, reason) => {
        closeDialog();
    };

    const cancelHandler = (event, reason) => {
        closeDialog();
    };
    

    const handleMeetingCreateDialogClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;  // if backdrop/outside of dialog click then do nothing/don't close dialog. making sure the process is completed properly
        closeDialog()
    };

    const closeDialog = () => {
        setConfirmData(setConfirmInitialData);
    }


    return {
        confirmAlert,
        ConfirmComponent: confirmData?.isOpen && (
            <Dialog open={confirmData?.isOpen} onClose={handleMeetingCreateDialogClose} disableEscapeKeyDown  >
                <DialogTitle>{confirmData?.title}</DialogTitle>
                <DialogContent>
                    {confirmData?.message}
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelHandler} color="error">
                        {confirmData?.config?.button?.cancel?.label}
                    </Button>
                    <Button onClick={confrimHandler} color="success">
                        {confirmData?.config?.button?.confirm?.label}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default useConfirm;
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Alert, Typography } from '@mui/material';
import SuccessButton from 'src/components/button/SuccessButton';
import ErrorTextButton from 'src/components/button/ErrorTextButton';

const useConfirm = (props) => {
    const { confrimHandler, cancelHandler } = props;

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
        setConfirmData({
            type,
            title,
            message,
            isOpen: true,
            config
        });
    };


    const confrim = (event) => {
        closeDialog();
        confrimHandler();
    };

    const cancel = (event) => {
        closeDialog();
        cancelHandler();
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
                <Alert severity="warning"><strong>Warning!</strong> {confirmData?.title}</Alert>
                <DialogContent style={{ textAlign: 'center' }}>
                    <Typography variant="h6" style={{ letterSpacing: "1px" }} >{confirmData?.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <ErrorTextButton handler={cancel}>{confirmData?.config?.button?.cancel?.label}</ErrorTextButton>
                    <SuccessButton handler={confrim}>{confirmData?.config?.button?.confirm?.label}</SuccessButton>
                </DialogActions>
            </Dialog>
        )
    }
}

export default useConfirm;
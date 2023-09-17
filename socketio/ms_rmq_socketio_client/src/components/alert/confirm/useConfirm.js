import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Alert, Typography, Divider } from '@mui/material';
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
                <Alert variant="filled" severity="warning"><strong>Warning!</strong> {confirmData?.title || 'Are you sure?'}</Alert>
                <DialogContent style={{ textAlign: 'center', background:'#fff3e0' }}>
                    <Typography variant="h6" style={{ letterSpacing: "1px" }} >{confirmData?.message || 'Do you really want to perform the action?'}</Typography>
                </DialogContent>
                <Divider/>
                <DialogActions sx={{ background:"#fff3e0" }}>
                    <ErrorTextButton handler={cancel} size="small">{confirmData?.config?.button?.cancel?.label}</ErrorTextButton>
                    <SuccessButton handler={confrim} size="small">{confirmData?.config?.button?.confirm?.label}</SuccessButton>
                </DialogActions>
            </Dialog>
        )
    }
}

export default useConfirm;
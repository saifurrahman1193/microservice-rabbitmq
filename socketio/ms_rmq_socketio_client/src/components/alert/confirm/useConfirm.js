import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, Paper, CardContent, Typography, CardTitle, } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

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
                <DialogTitle style={{ textAlign: 'center' }}>
                    <WarningAmberOutlinedIcon style={{ fontSize: 100, color: '#ffa50099' }} /> <br />
                    <Paper style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: "1px", color: "#060606a8" }} elevation={0} >{confirmData?.title}</Paper>
                </DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    <Typography variant="h6" style={{ letterSpacing: "1px" }} >{confirmData?.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel} style={{ color: "#f73378" }} color="error"  variant='text'>
                        {confirmData?.config?.button?.cancel?.label}
                    </Button>
                    <Button onClick={confrim} style={{ background: "#4caf50" }} variant="contained">
                        {confirmData?.config?.button?.confirm?.label}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default useConfirm;
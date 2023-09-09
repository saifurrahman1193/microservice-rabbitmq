import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, Paper, CardContent, Typography, CardTitle, } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

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

                <DialogContent>
                    <DialogTitle style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', letterSpacing: "1px", color: "#060606a8" }} >
                        <WarningIcon style={{ fontSize: 48, color: 'orange' }} /> <br />
                        {confirmData?.title}
                    </DialogTitle>
                    <Card elevation={0}>
                        <CardContent>
                            <Typography variant="h6">{confirmData?.message}</Typography>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel} color="error">
                        {confirmData?.config?.button?.cancel?.label}
                    </Button>
                    <Button onClick={confrim} color="success" variant="contained">
                        {confirmData?.config?.button?.confirm?.label}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default useConfirm;
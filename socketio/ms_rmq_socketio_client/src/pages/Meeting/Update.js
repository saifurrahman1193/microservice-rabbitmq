import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { TextField, Button, Grid } from '@mui/material';
import moment from 'moment'; // If you're using ES Modules
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Styles from './Styles.js';
import SendIcon from '@mui/icons-material/Send';
import { patchCall } from 'src/services/api/apiService.js';

const Update = forwardRef((props, ref) => {

    const { data, handleGetMeetings, showAlert } = props;

    const handleMeetingUpdateSubmit = async (event) => {
        event.preventDefault();

        let response = await patchCall(MEETING+ '/' + data._id, { ...formData });

        if (response?.code === 200) {
            showAlert("Meeting updated successfully!", "success", "top-right", 5000);
            handleGetMeetings();
            handleMeetingUpdteDialogClose();
        } else {
            showAlert(response?.message?.[0], "error", "top-right", 5000);
        }
    };

    const [formInitial, setFormInitial] = useState({
        title: '',
        description: '',
        location: '',
        start_time: null, // moment(getTodayStartTime())
        end_time: null,
    });

    const [formData, setFormData] = useState(formInitial)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setFormData(formInitial)
    }, [formInitial])



    // Meeting Update Dialog related
    const [meetingUpdateDialogOpen, setMeetingUpdateDialogOpen] = useState(false);
    const handleMeetingUpdateDialogOpen = () => {
        setMeetingUpdateDialogOpen(true);
    };
    const handleMeetingUpdteDialogClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;  // if backdrop/outside of dialog click then do nothing/don't close dialog. making sure the process is completed properly
        setFormData(formInitial);
        setMeetingUpdateDialogOpen(false);
    };


    useImperativeHandle(ref, () => ({
        handle_updateMeeting() {
            setFormData(data);
            handleMeetingUpdateDialogOpen()
        }
    }));


    return (
        <>
            <Dialog open={meetingUpdateDialogOpen} onClose={handleMeetingUpdteDialogClose} maxWidth="sm" fullWidth={true} disableEscapeKeyDown  >
                <DialogTitle>Update Meeting</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <form onSubmit={handleMeetingUpdateSubmit}>
                        <Grid item lg={12}>
                            <TextField size="small" sx={Styles.textField} fullWidth label="Meeting Title" name="title" value={formData?.title} onChange={handleChange} required />
                        </Grid>
                        <Grid item lg={12}>
                            <TextField size="small" sx={Styles.textField} fullWidth label="Meeting Description" name="description" value={formData?.description} onChange={handleChange} required />
                        </Grid>
                        <Grid item lg={12}>
                            <TextField size="small" sx={Styles.textField} fullWidth label="Meeting Location" name="location" value={formData?.location} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} padding={0} >
                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start Time *"
                                        // defaultValue={formData?.start_time}
                                        onChange={(newValue) => {
                                            setFormData((prev) => ({ ...prev, start_time: moment(newValue).format('YYYY-MM-DD HH:mm:ss') }))
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End Time *"
                                        // defaultValue={formData?.end_time}
                                        onChange={(newValue) => {
                                            setFormData((prev) => ({ ...prev, end_time: moment(newValue).format('YYYY-MM-DD HH:mm:ss') }))
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <DialogActions sx={{ marginTop: "20px" }}>
                            <Button onClick={handleMeetingUpdteDialogClose} style={{ color: "#f73378" }} color="error" variant='text' >
                                Cancel
                            </Button>
                            <Button type="submit" style={{ background: "#4caf50" }} variant="contained" endIcon={<SendIcon />}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
})

export default Update
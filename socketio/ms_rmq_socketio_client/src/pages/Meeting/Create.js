import React, { useState, useEffect, forwardRef } from 'react'
import { TextField, Button, Grid } from '@mui/material';
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import moment from 'moment'; // If you're using ES Modules
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'src/services/api/axios_config/Axios.js'
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Styles from './Styles.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import { useAlert } from 'src/components/alert/timeout-alert/useAlert.js'

const Create = forwardRef((props, ref) => {
    const [meeting_create_res, errorCreateMeeting, loadingMeeting, axiosCreateMeeting] = useAxiosFunction();

    const [formInitial, setFormInitial] = useState({
        title: '',
        description: '',
        start_time: null, // moment(getTodayStartTime())
        end_time: null,
        location: '',
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


    const handleMeetingCreateSubmit = async (event) => {
        event.preventDefault()


        axiosCreateMeeting({
            axiosInstance: axios, // Replace with your Axios instance
            method: "post",
            url: MEETING, // Replace with your endpoint
            requestConfig: {
                data: { ...formData }, // Replace with your form data
            },
        }).then((response) => {
            console.log("meeting_create_res", response);
            // Handle the successful response here
            return response; // You can choose to return the response if needed
        })
        .catch((error) => {
            console.error("Error creating meeting:", error);
            // Handle the error here
            throw error; // Re-throw the error to propagate it to the caller
        });


        // console.log("meeting_create_res", meeting_create_res);

        // showAlert("Meeting created successfully!", "success", "top-right", 5000);
        // handleMeetingCreateDialogClose();
        // props?.handleGetMeetings();

    }

    // useEffect(() => {
    //     console.log('meeting_create_res========================', meeting_create_res);
    //     if (meeting_create_res) {
    //         console.log('meeting_create_res========================', meeting_create_res);
    //     }
    // }, [meeting_create_res])



    // Meeting Create Dialog related
    const [meetingCreateDialogOpen, setMeetingCreateDialogOpen] = useState(false);
    const handleMeetingCreateDialogOpen = () => {
        setMeetingCreateDialogOpen(true);
    };
    const handleMeetingCreateDialogClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;  // if backdrop/outside of dialog click then do nothing/don't close dialog. making sure the process is completed properly
        setFormData(formInitial);
        setMeetingCreateDialogOpen(false);
    };


    const { showAlert, AlertComponent } = useAlert();

    return (
        <>
            {AlertComponent}


            <Button variant="outlined" onClick={handleMeetingCreateDialogOpen} sx={{ margin: '15px' }} startIcon={<AddCircleIcon />}>
                Add New Meeting
            </Button>

            <Dialog open={meetingCreateDialogOpen} onClose={handleMeetingCreateDialogClose} maxWidth="sm" fullWidth={true} disableEscapeKeyDown  >
                <DialogTitle>Create Meeting</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <form onSubmit={handleMeetingCreateSubmit}>
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
                            <Button onClick={handleMeetingCreateDialogClose} color="error" variant='text' >
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained" endIcon={<SendIcon />}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
})

export default Create
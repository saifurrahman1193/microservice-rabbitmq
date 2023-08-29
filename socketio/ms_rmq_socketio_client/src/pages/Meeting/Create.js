import React, { useState, useEffect, forwardRef } from 'react'
import { TextField, Button, CardContent, Paper, Container, Grid } from '@mui/material';
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

const Create = forwardRef((props, ref) => {
    const [meeting_create_res, errorCreateMeeting, loadingMeeting, axiosCreateMeeting] = useAxiosFunction();

    const [formInitial, setFormInitial] = useState({
        title: '',
        description: '',
        date: null,
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

        await axiosCreateMeeting({
            axiosInstance: axios,
            method: 'post',
            url: MEETING,
            requestConfig: {
                data: { ...formData }
            }
        })
        handleMeetingCreateDialogClose()
        props?.handleGetMeetings();
    }



    // Meeting Create Dialog related
    const [meetingCreateDialogOpen, setMeetingCreateDialogOpen] = useState(false);
    const handleMeetingCreateDialogOpen = () => {
        setMeetingCreateDialogOpen(true);
    };
    const handleMeetingCreateDialogClose = () => {
        setMeetingCreateDialogOpen(false);
    };


    return (
        <>
            <Button variant="outlined" onClick={handleMeetingCreateDialogOpen} sx={{ margin: '15px' }}>
                Add New Meeting
            </Button>
            <Dialog open={meetingCreateDialogOpen} onClose={handleMeetingCreateDialogClose} maxWidth="sm" fullWidth={true}>
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
                        <DialogActions>
                            <Button onClick={handleMeetingCreateDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
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
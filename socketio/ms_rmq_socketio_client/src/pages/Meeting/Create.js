import React, { useState, useEffect, useRef } from 'react'
import { TextField, Divider, Grid } from '@mui/material';
import moment from 'moment'; // If you're using ES Modules
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Styles from './Styles.js';
import { postCall } from 'src/services/api/apiService.js';
import SubmitButtonLoading from 'src/components/button/SubmitButtonLoading.js';
import ErrorTextButton from 'src/components/button/ErrorTextButton.js';
import AddOutlinedButton from 'src/components/button/AddOutlinedButton.js';
import { checkIsError, getErrorMessage } from 'src/utils/ErrorHelpers.js';


const Create = ((props) => {

    const { handleGetMeetings, showAlert } = props;

    const handleMeetingCreateSubmit = async (event) => {
        event.preventDefault();
        handleCreateProcess(true);

        let response = await postCall(MEETING, { ...formData });

        if (response?.code === 201) {
            showAlert("Meeting created successfully!", "success", "top-right", 5000);
            handleGetMeetings();
            handleMeetingCreateDialogClose();
            handleCreateProcess(false);
            setErrors([])
        } else {
            showAlert(response?.message?.[0], "error", "top-right", 5000);
            handleCreateProcess(false);
            setErrors(response?.errors)
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
    const [errors, setErrors] = useState([])

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

    const childCreateRef = useRef();
    const handleCreateProcess = (loading) => {
        childCreateRef.current.handleProcess({ load: loading });
    }


    return (
        <>
            <AddOutlinedButton handler={handleMeetingCreateDialogOpen}>Add New Meeting</AddOutlinedButton>

            <Dialog open={meetingCreateDialogOpen} onClose={handleMeetingCreateDialogClose} maxWidth="sm" fullWidth={true} disableEscapeKeyDown  >
                <DialogTitle>Create Meeting</DialogTitle>
                <Divider />
                <form onSubmit={handleMeetingCreateSubmit}>
                    <DialogContent>
                        <Grid item lg={12}>
                            <TextField size="small" sx={Styles.textField} fullWidth label="Meeting Title" name="title" value={formData?.title} onChange={handleChange} helperText={getErrorMessage(errors, 'title')} error={checkIsError(errors, 'title')} required />
                        </Grid>
                        <Grid item lg={12}>
                            <TextField size="small" sx={Styles.textField} fullWidth label="Meeting Description" name="description" value={formData?.description} onChange={handleChange} helperText={getErrorMessage(errors, 'description')} error={checkIsError(errors, 'description')} required />
                        </Grid>
                        <Grid item lg={12}>
                            <TextField size="small" sx={Styles.textField} fullWidth label="Meeting Location" name="location" value={formData?.location} onChange={handleChange} helperText={getErrorMessage(errors, 'location')} error={checkIsError(errors, 'location')} required />
                        </Grid>
                        <Grid item lg={12}>
                            <LocalizationProvider dateAdapter={AdapterMoment} >
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start Time"
                                        onChange={(newValue) => {
                                            setFormData((prev) => ({ ...prev, start_time: moment(newValue).utc() }))
                                        }}
                                        format="DD-MM-YYYY hh:mm a"
                                        size="small"
                                        slotProps={{
                                            textField: {
                                                sx: Styles.textField,
                                                helperText: getErrorMessage(errors, 'start_time'),
                                                error: checkIsError(errors, 'start_time'),
                                                required: true,
                                                size: 'small'
                                            },
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item lg={12}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End Time"
                                        onChange={(newValue) => {
                                            setFormData((prev) => ({ ...prev, end_time: moment(newValue).utc() }))
                                        }}
                                        format="DD-MM-YYYY hh:mm a"
                                        slotProps={{
                                            textField: {
                                                helperText: getErrorMessage(errors, 'end_time'),
                                                error: checkIsError(errors, 'end_time'),
                                                required: true,
                                                size: 'small'
                                            },
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ marginY: "10px" }}>
                        <ErrorTextButton handler={handleMeetingCreateDialogClose}>Cancel</ErrorTextButton>
                        <SubmitButtonLoading ref={childCreateRef} />
                    </DialogActions>
                </form>
            </Dialog >
        </>
    )
})

export default Create
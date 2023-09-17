import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { TextField, Grid, Divider } from '@mui/material';
import moment from 'moment'; // If you're using ES Modules
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { Dialog, DialogContent } from '@mui/material';
import Styles from './Styles.js';
import { getCall, putCall } from 'src/services/api/apiService.js';
import SubmitButtonLoading from 'src/components/button/SubmitButtonLoading.js';
import ErrorTextButton from 'src/components/button/ErrorTextButton.js';
import { checkIsError, getErrorMessage } from 'src/utils/ErrorHelpers.js';
import DialogTitlePrimary from 'src/components/dialog/title/DialogTitlePrimary.js';
import DialogActionsGeneral from 'src/components/dialog/actions/DialogActionsGeneral.js';

const Update = forwardRef((props, ref) => {

    const { data, handleGetMeetings, showAlert } = props;

    const [formInitial, setFormInitial] = useState({
        title: '',
        description: '',
        location: '',
        start_time: null, // moment(getTodayStartTime())
        end_time: null,
    });

    const [formData, setFormData] = useState(formInitial)
    const [errors, setErrors] = useState([])

    const handleMeetingUpdateSubmit = async (event) => {
        handleUpdateProcess(true);
        event.preventDefault();

        let response = await putCall(MEETING + '/' + data._id, { ...formData });

        if (response?.code === 200) {
            showAlert("Meeting updated successfully!", "success", "top-right", 5000);
            handleGetMeetings();
            handleMeetingUpdteDialogClose();
            handleUpdateProcess(false);
            setErrors([])
        } else {
            showAlert(response?.message?.[0], "error", "top-right", 5000);
            handleUpdateProcess(false);
            setErrors(response?.errors)
        }
    };

    const handleGetMeetingData = async (event) => {

        let response = await getCall(MEETING + '/' + data._id);
        if (response?.code === 200) {
            setFormData(response?.data);
        } else {
            setFormData(formInitial);
            showAlert(response?.message?.[0], "error", "top-right", 5000);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


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
            // setFormData(data);
            handleGetMeetingData()
            setMeetingUpdateDialogOpen(true);
        }
    }));

    const childUpdateRef = useRef();
    const handleUpdateProcess = (loading) => {
        childUpdateRef.current.handleProcess({ load: loading });
    }


    return (
        <>
            <Dialog open={meetingUpdateDialogOpen} onClose={handleMeetingUpdteDialogClose} maxWidth="sm" fullWidth={true} disableEscapeKeyDown  >
                <DialogTitlePrimary  closeHandler={handleMeetingUpdteDialogClose}>Update Meeting</DialogTitlePrimary>
                <form onSubmit={handleMeetingUpdateSubmit}>
                    <Divider />
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
                                        value={moment(formData?.start_time)}  // utc to moment time (current zone)
                                        onChange={(newValue) => {
                                            setFormData((prev) => ({ ...prev, start_time: moment(newValue).utc() }))    // view/moment to utc time to send to api to store in db (utc)
                                        }}
                                        format="DD-MM-YYYY hh:mm a"  // format to show in view/moment (current zone) 
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
                                        value={moment(formData?.end_time)} // utc to moment time (current zone)
                                        onChange={(newValue) => {
                                            setFormData((prev) => ({ ...prev, end_time: moment(newValue).utc() })) // view/moment to utc time to send to api to store in db (utc)
                                        }}
                                        format="DD-MM-YYYY hh:mm a"  // format to show in view/moment (current zone) 
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
                    <DialogActionsGeneral>
                        <ErrorTextButton handler={handleMeetingUpdteDialogClose}>Cancel</ErrorTextButton>
                        <SubmitButtonLoading ref={childUpdateRef} />
                    </DialogActionsGeneral>
                </form>
            </Dialog>
        </>
    )
})

export default Update
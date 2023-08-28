import React, { useState, useEffect, forwardRef} from 'react'
import { TextField, Button,  CardContent, Paper, Container, Grid } from '@mui/material';
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import moment from 'moment'; // If you're using ES Modules
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'src/services/api/axios_config/Axios.js'
import { MEETING } from 'src/services/api/api_path/APIPath.js';


const  Create = forwardRef((props, ref) => {
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


    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        paper: {
            padding: '20px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        },
        textField: {
            // marginBottom: '16px',
        },
        submitButton: {
            marginTop: '16px',
            marginLeft: 'auto'
        },
    };

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
        props?.handleGetMeetings();
    }

    

    return (
        <CardContent>
            <Container sx={styles.container}>
                <Paper sx={styles.paper} elevation={3}>
                    <form onSubmit={handleMeetingCreateSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField size="small" sx={styles.textField} fullWidth label="Meeting Title" name="title" value={formData?.title} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField size="small" sx={styles.textField} fullWidth label="Meeting Description" name="description" value={formData?.description} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField size="small" sx={styles.textField} fullWidth label="Meeting Location" name="location" value={formData?.location} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} padding={0} >
                                <LocalizationProvider dateAdapter={AdapterMoment} >
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker
                                            label="Start Time *"
                                            defaultValue={formData?.start_time}
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
                                            defaultValue={formData?.end_time}
                                            onChange={(newValue) => {
                                                setFormData((prev) => ({ ...prev, end_time: moment(newValue).format('YYYY-MM-DD HH:mm:ss') }))
                                            }}
                                            format="YYYY-MM-DD HH:mm:ss"
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Button
                                sx={styles.submitButton}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </CardContent>
    )
})

export default Create
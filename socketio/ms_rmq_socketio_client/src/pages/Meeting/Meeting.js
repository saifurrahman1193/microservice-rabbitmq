import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Container, Grid } from '@mui/material';
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import axios from 'src/services/api/axios_config/Axios.js'
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { getTodayStartTime, getTodayEndTime, getSpecificDateTimeAMPM } from '../../utils/CommonHelpers.js'
import moment from 'moment'; // If you're using ES Modules
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import DynamicTable from 'src/components/table/DynamicTable';
import { StyledTableHeaderCell } from 'src/components/table/style.js';

function Meeting() {

    const [meetings, setMeetings] = useState([]);  // meetings

    // Axios Hook
    const [meeting_create_res, errorCreateMeeting, loadingMeeting, axiosCreateMeeting] = useAxiosFunction();
    const [meetingsGetRes, errorGetMeetings, loadingGetMeetings, axiosGetMeetings] = useAxiosFunction();

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

        handleGetMeetings()
    }

    const handleGetMeetings = async (event) => {
        await axiosGetMeetings({
            axiosInstance: axios,
            method: 'get',
            url: MEETING,
        })
    }

    useEffect(() => {
        setFormData(formInitial)
    }, [formInitial])

    useEffect(() => {

    }, [meeting_create_res])

    // On Load 
    useEffect(() => {
        handleGetMeetings();
    }, []);

    useEffect(() => {
        setMeetings(meetingsGetRes?.data)
    }, [meetingsGetRes]);

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
        smallDateTimePicker: {
            '& .MuiStack-root': {
                paddingTop: '4px !important', // Adjust padding as needed
            },
        },
    };


    const meetingTable = {
        styles: {
            table: {
                maxHeight: '60vh',
            },
        },
        columns: [
            { id: '_id', label: 'ID', headerStyle: StyledTableHeaderCell },
            { id: 'title', label: 'Title', headerStyle: StyledTableHeaderCell },
            { id: 'description', label: 'Description', headerStyle: StyledTableHeaderCell },
            { id: 'time', label: 'Time', headerStyle: StyledTableHeaderCell },
            { id: 'location', label: 'Location', headerStyle: StyledTableHeaderCell },
        ]
    }


    return (
        <Card>
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

            <Grid item xs={12}>
                <Card>
                    {loadingGetMeetings && <Paper style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</Paper>}
                    {!loadingGetMeetings && errorCreateMeeting && <p className="errMsg">{errorCreateMeeting}</p>}
                    {
                        !loadingGetMeetings &&
                        <DynamicTable styles={meetingTable?.styles} columns={meetingTable?.columns} data={meetings} tableType='sticky-header' />
                    }
                </Card>
            </Grid>

        </Card>
    );
};

export default Meeting;


// Meetings Management (title, description, schedule_date, start_time, end_time, location, agenda, meeting_type, participants, permissions)
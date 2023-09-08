import React, { useState, useEffect, useRef } from 'react';

import Create from './Create';
import List from './List';
import { Card } from '@mui/material';
import { useAlert } from 'src/components/alert/timeout-alert/useAlert.js'

function Meeting() {
    const childListRef = useRef();
    const childCreateRef = useRef();
    const { showAlert, AlertComponent } = useAlert();


    const handleGetMeetings = () => {
        childListRef.current.handle_getMeetings();
    }

    return (
        <Card>
            {AlertComponent}
            <Create ref={childCreateRef} handleGetMeetings={handleGetMeetings} />
            <List ref={childListRef} showAlert={showAlert} />
        </Card>
    );
};

export default Meeting;


// Meetings Management (title, description, schedule_date, start_time, end_time, location, agenda, meeting_type, participants, permissions)
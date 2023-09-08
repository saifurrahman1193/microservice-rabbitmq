import React, { useEffect, useState } from 'react';
import { Alert, LinearProgress } from '@mui/material';
import './style.css';

export const useAlert = () => {
    const initialProgress = 100;
    const [progress, setProgress] = useState(initialProgress);

    const [alertData, setAlertData] = useState({
        message: '',
        isOpen: false,
        timeout: 5000,
        type: 'success', // Default type
        position: 'top-right', // Default position
    });

    useEffect(() => {
        if (alertData?.isOpen && alertData?.timeout > 0) {
            const timeoutId = setTimeout(() => {
                setAlertData((prevState) => ({
                    ...prevState,
                    isOpen: false,
                }));
            }, alertData?.timeout);

            return () => clearTimeout(timeoutId);
        }
    }, [alertData?.isOpen]);

    const showAlert = (message, type = 'success', position = 'top-right', timeout = 5000) => {
        setAlertData({
            message,
            isOpen: true,
            timeout,
            type,
            position,
        });
    };

    const closeAlert = () => {
        setAlertData((prevState) => ({
            ...prevState,
            isOpen: false,
        }));
    };

    useEffect(() => {
        if (alertData?.isOpen && alertData?.timeout > 0) {
            let interval = 100
            const intervalId = setInterval(() => {
                console.log('interval=========');
                if (progress > 0) {
                    let diff = (interval*progress) / alertData?.timeout 

                    console.log(interval, progress, alertData?.timeout ,  diff, progress - diff );
                    
                    setProgress((progress) => progress - diff);
                } else {
                    clearInterval(intervalId); // Stop the interval when progress reaches 0
                    setProgress(initialProgress);
                }
            }, interval); // Update the progress every 1000ms (100 mili second)

            // Clean up the interval when the component unmounts
            return () =>  clearInterval(intervalId)
        }

    }, [alertData?.isOpen, alertData?.timeout, progress]);

    return {
        showAlert,
        AlertComponent: alertData?.isOpen && (
            <div className={`custom-alert ${alertData?.position}`}>
                <Alert
                    variant="filled"
                    severity={alertData?.type}
                    onClose={closeAlert}
                >
                    {alertData?.message}
                </Alert>
                <LinearProgress variant="determinate" value={progress} color={alertData?.type} />
            </div>
        ),
    };
};

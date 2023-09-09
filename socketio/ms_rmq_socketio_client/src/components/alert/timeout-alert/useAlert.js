import React, { useEffect, useState } from 'react';
import { Alert, LinearProgress } from '@mui/material';
import './style.css';

export const useAlert = () => {

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
            </div>
        ),
    };
};

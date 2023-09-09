import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
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

    const getAlertStyle = (type='success') => {
        switch (type) {
            case 'error':
                return { backgroundColor: 'rgb(247, 51, 120)', color: 'white' };
            case 'warning':
                return { backgroundColor: 'yellow', color: 'black' };
            case 'info':
                return { backgroundColor: 'blue', color: 'white' };
            case 'success':
                return { backgroundColor: 'rgb(76, 175, 80)', color: 'white' };
            default:
                return { backgroundColor: 'rgb(76, 175, 80)', color: 'white' }; // Default style
        }
    };


    return {
        showAlert,
        AlertComponent: alertData?.isOpen && (
            <div className={`custom-alert ${alertData?.position}`}>
                <Alert
                    variant="filled"
                    onClose={closeAlert}
                    severity={alertData?.type}
                    style={getAlertStyle(alertData?.type)}
                >
                    {alertData?.message}
                </Alert>
            </div>
        ),
    };
};

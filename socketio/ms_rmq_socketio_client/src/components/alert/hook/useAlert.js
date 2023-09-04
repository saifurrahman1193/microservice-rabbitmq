import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

export const useAlert = () => {
    const [alertData, setAlertData] = useState({
        message: '',
        isOpen: false,
        timeout: 5000, // Default timeout
    });

    useEffect(() => {
        if (alertData.isOpen && alertData.timeout > 0) {
            const timeoutId = setTimeout(() => {
                setAlertData((prevState) => ({
                    ...prevState,
                    isOpen: false,
                }));
            }, alertData.timeout);

            return () => clearTimeout(timeoutId);
        }
    }, [alertData]);

    const showAlert = (message, timeout = 5000) => {
        setAlertData({
            message,
            isOpen: true,
            timeout,
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
        closeAlert,
        AlertComponent: alertData.isOpen && (
            <div style={ { position: 'fixed',  top: '20px', right: '20px', zIndex: '9999'  } }>
                <Alert
                    variant="filled"
                    severity="success"
                    onClose={closeAlert}
                >
                    {alertData.message}
                </Alert>
            </div>
        ),
    };
};

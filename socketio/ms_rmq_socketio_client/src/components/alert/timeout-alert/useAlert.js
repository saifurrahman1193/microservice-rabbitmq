import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import './style.css';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

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

    const getAlertStyle = (type = 'success') => {
        switch (type) {
            case 'error':
                return { backgroundColor: 'rgba(220,53,69,.85)', color: 'white' };
            case 'warning':
                return { backgroundColor: 'rgba(255,193,7,.85)', color: 'black' };
            case 'info':
                return { backgroundColor: 'rgba(23,162,184,.85)', color: 'white' };
            case 'success':
                return { backgroundColor: 'rgba(40,167,69,.85)', color: 'white' };
            default:
                return { backgroundColor: 'rgba(40,167,69,.85)', color: 'white' }; // Default style
        }
    };

    const iconComponentMap = {
        'success': CheckCircleOutlineOutlinedIcon,
        'error': PrivacyTipOutlinedIcon,
        'info': InfoOutlinedIcon,
        'warning': WarningAmberOutlinedIcon,
    };
    function IconDynamicComponent(props) {
        const SelectedComponent = iconComponentMap[alertData?.type] || CheckCircleOutlineOutlinedIcon;
    
        return <SelectedComponent {...props} />;
    }

    return {
        showAlert,
        AlertComponent: alertData?.isOpen && (
            <div className={`custom-alert ${alertData?.position}`}>
                <Alert
                    variant="filled"
                    onClose={closeAlert}
                    severity={alertData?.type}
                    style={getAlertStyle(alertData?.type)}
                    icon={<IconDynamicComponent />}
                >
                    {alertData?.message}
                </Alert>
            </div>
        ),
    };
};

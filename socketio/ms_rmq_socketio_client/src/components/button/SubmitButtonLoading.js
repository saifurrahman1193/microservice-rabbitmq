import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

const SubmitButtonLoading = forwardRef((props, ref) => {

    const [loading, setLoading] = useState(false);
    const [styles, setStyles] = useState({ background: "#4caf50", color: "#fff" });
    const [icon, setIcon] = useState(<SendIcon />);
    const [progressingText, setProgressingText] = useState("Processing...");
    const [submittingText, setSubmittingText] = useState("Submit");

    useImperativeHandle(ref, () => ({
        handle_UpdateProcess(config) {
            const { load, progressText, submitText} = config;
            progressText && setProgressingText(progressText);
            submitText && setSubmittingText(submittingText);
            setLoading(load);
            handleUpdateLoading(load);
        }
    }));

    const handleUpdateLoading = (load = false) => {
        processStyles(load)
        processIcon(load)
    }



    const processStyles = (load) => {
        if (load) {
            setStyles({ background: "#fff", color: "green" })
        } else {
            setStyles({ background: "#4caf50", color: "#fff" })
        }
    }
    const processIcon = (load) => {
        if (load) {
            setIcon(<CircularProgress size={24} style={{ color: "#4caf50" }} />)
        } else {
            setIcon(<SendIcon />)
        }
    }

    return (
        <Button type="submit" style={styles} variant="contained" endIcon={icon} disabled={loading}>
            {loading ? progressingText : submittingText}
        </Button>
    )
})

export default SubmitButtonLoading
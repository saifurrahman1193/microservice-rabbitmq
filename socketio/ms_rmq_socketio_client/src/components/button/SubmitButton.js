import React from 'react'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function SubmitButton(props) {
    const { children, handler, ...domProps } = props;

    return (
        <Button type="submit" style={{ background: "#4caf50" }} variant="contained" size='small' endIcon={<SendIcon />} {...domProps}>
            Submit
        </Button>
    )
}

export default SubmitButton
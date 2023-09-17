import React from 'react'
import { DialogTitle, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function DialogTitlePrimary(props) {
    const { children, closeHandler, ...domProps } = props;
    return (
        <DialogTitle sx={{ background: '#16a9ff', color: '#fff', display: 'flex', justifyContent: 'space-between' }} {...domProps}>
            {children}
            <Box>
                <CloseIcon onClick={closeHandler} style={{ cursor: 'pointer' }} />
            </Box>
        </DialogTitle>
    )
}

export default DialogTitlePrimary
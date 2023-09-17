import React from 'react'
import { DialogTitle, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function DialogTitlePrimary(props) {
    const { children, closeHandler, ...domProps } = props;
    return (
        <DialogTitle sx={{ background: '#16a9ff', color: '#fff', display: 'flex', justifyContent: 'space-between' }} {...domProps}>
            {children}
            <Box>
                <IconButton onClick={closeHandler} sx={{ color:'#e3f2fd' }} >
                    <CloseIcon/>
                </IconButton>
            </Box>
        </DialogTitle >
    )
}

export default DialogTitlePrimary
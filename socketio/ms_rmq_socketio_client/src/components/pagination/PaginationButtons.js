import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons(props) {
    const { children, ...domProps } = props;

    const [page, setPage] = useState(1);
    const onChange = (e, page) => {
        console.log(e, page);
        setPage(page);
    };

    return (
        <Stack spacing={2}>
            <Pagination 
                showFirstButton 
                showLastButton
                count={100}
                page={page}
                onChange={onChange}
                color="primary"
                {...domProps}
            >
                {children}
            </Pagination>
        </Stack>
    );
}

// https://mui.com/material-ui/api/pagination/
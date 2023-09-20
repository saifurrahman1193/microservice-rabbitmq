import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons(props) {
    const { children, stackStyle, ...domProps } = props;

    const [page, setPage] = useState(1);
    const onChange = (e, page) => {
        console.log(e, page);
        setPage(page);
    };

    return (
        <Stack direction="row" style={{ 'paddingTop': '15px', 'paddingBottom': '15px', ...stackStyle }}>
            <Pagination
                showFirstButton                 // show first button |< < 
                showLastButton                  // show the last button = > >|
                count={100}                     // count the number of pages to show
                page={page}                     // page number
                boundaryCount={1}               // start & end show n buttons
                onChange={onChange}             // on click button change event handler for page change
                color="primary"                 // color the button
                style={{ marginLeft: 'auto' }}
                {...domProps}
            >
                {children}
            </Pagination>
        </Stack>
    );
}

// https://mui.com/material-ui/api/pagination/
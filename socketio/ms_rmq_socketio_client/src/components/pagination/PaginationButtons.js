import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons(props) {
    const { paginator, children, handler, stackStyle, ...domProps } = props;

    const onChange = (e, page) => {
        e.preventDefault();
        handler(e, page);
    };

    return (
        <Stack direction="row" style={{ paddingTop: '15px', paddingBottom: '15px', ...stackStyle }}>
            <div style={{ paddingLeft: '10px', paddingTop: '5px' }}>
                Showing {paginator?.current_page == 1 ?
                    1
                    :
                    (paginator?.current_page - 1) * paginator?.record_per_page + 1
                }
                &nbsp;to&nbsp;
                {
                    paginator?.current_page == 1
                        ? paginator?.current_page_items_count
                        :
                        (paginator?.current_page - 1) * paginator?.record_per_page + paginator?.current_page_items_count
                }
                &nbsp;of&nbsp;
                {paginator?.total_count} entries
            </div>

            <Pagination
                showFirstButton                 // show first button |< < 
                showLastButton                  // show the last button = > >|
                count={paginator?.total_pages}  // count the number of pages to show
                page={paginator?.current_page}                     // page number
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
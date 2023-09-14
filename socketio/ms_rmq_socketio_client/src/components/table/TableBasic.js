// ** React Imports

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { StyledTableHeaderCell } from 'src/components/table/style.js';
import CellRender from 'src/components/table/CellRender';

const TableBasic = (props) => {

    const { styles, columns, data, children, ...domProps } = props;

    return (
        <>
            {
                data?.length !== 0 &&
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: styles?.table?.maxHeight || 'auto' }}>
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                                <TableRow>
                                    {columns?.map(column => (
                                        <TableCell key={column?.id} align={column?.align}
                                            sx={column?.headerStyle ? { ...column?.headerStyle } : { ...StyledTableHeaderCell }}  // default StyledTableHeaderCell, can be overriden by column.headerStyle
                                        >
                                            {column?.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((row, index) => {
                                    return (
                                        <TableRow hover role='checkbox' tabIndex={-1} key={`row-index-${index}`}>
                                            {columns.map((column, j) => {

                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <CellRender {...props} column={column} row={row} />
                                                    </TableCell>
                                                )
                                            })}

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>
            }

        </>
    )
}

export default TableBasic

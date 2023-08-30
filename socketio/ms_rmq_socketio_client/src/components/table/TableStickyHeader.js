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
import NoDataFound from 'src/components/alert/NoDataFound.js';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TableStickyHeader = ({ styles, columns, data, config }) => {

    return (
        <>
            {config?.noDataFound && data?.length == 0 && <NoDataFound styles={styles} />}   {/* No Data Found alert when data length = 0 */}

            {
                data?.length != 0 &&
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
                                    {config?.tableAction && <TableCell> Action</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((row, index) => {
                                    return (
                                        <TableRow hover role='checkbox' tabIndex={-1} key={`row-index-${index}`}>
                                            {columns.map((column, j) => {
                                                const value = row[column?.id]

                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                )
                                            })}
                                            {
                                                config?.tableAction &&
                                                <TableCell>
                                                    <IconButton >
                                                        {/* { ...styles?.table?.action?.edit?.styles } */}
                                                        <EditIcon  color={ styles?.table?.action?.edit?.styles?.color} />  
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteIcon color={styles?.table?.action?.delete?.styles?.color} />
                                                    </IconButton>
                                                    {/* <IconButton onClick={() => onEdit(row.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => onDelete(row.id)}>
                                                            <DeleteIcon />
                                                        </IconButton> */}
                                                </TableCell>
                                            }
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

export default TableStickyHeader

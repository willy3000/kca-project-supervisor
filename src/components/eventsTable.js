import React from 'react'
import { Box,
Typography,
TableContainer,
TableHead,
Table,
TableBody,
Paper
} from '@mui/material'
import { StyledTableCell, StyledTableRow } from '../constants'

export default function EventsTable(props) {
    const {events} = props

  return (
    <>
        <TableContainer component={Paper} sx={{margin:'auto', maxWidth: '1800px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <StyledTableRow
              key={event.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row" align='left'>
                <Typography>
                {event.title}
                </Typography>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align='center'>
                <Typography>
                {event.date}
                </Typography>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align='right'>
                <Typography>
                {event.time}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

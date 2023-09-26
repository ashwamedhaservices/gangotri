import { Paper, Table, TableContainer, TableRow, TableHead, TableCell, TableBody } from '@mui/material'
import React from 'react'

const Row = ({ row }) => {
  const { name, description, provider, url, start_time, end_time } = row;
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{provider}</TableCell>
      <TableCell align="right">{url}</TableCell>
      <TableCell align="right">{start_time}</TableCell>
      <TableCell align="right">{end_time}</TableCell>
    </TableRow>
  );
}

const MeetingTable = ({ meetings }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Meeting name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Provider</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Start time</TableCell>
            <TableCell align="right">End time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((meeting) => (
            <Row key={meeting.id} row={meeting} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MeetingTable
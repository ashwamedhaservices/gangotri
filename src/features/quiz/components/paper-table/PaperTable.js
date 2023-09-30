import { Paper, Table, TableContainer, TableRow, TableHead, TableCell, TableBody } from '@mui/material'
import React from 'react'

const Row = ({ row }) => {
  const { name, notes, testable_type, testable_id } = row;
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{notes}</TableCell>
      <TableCell align="right">{testable_type}</TableCell>
      <TableCell align="right">{testable_id}</TableCell>
      <TableCell align="right">edit</TableCell>
      <TableCell align="right">view</TableCell>
    </TableRow>
  );
}

const PaperTable = ({ papers }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Paper name</TableCell>
            <TableCell align="right">Paper notes</TableCell>
            <TableCell align="right">Paper type</TableCell>
            <TableCell align="right">Paper typeid</TableCell>
            <TableCell align="right">edit</TableCell>
            <TableCell align="right">view</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {papers && papers.map((paper) => (
            <Row key={paper.id} row={paper} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaperTable
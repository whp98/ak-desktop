import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const JsonTable = ({ data }) => (
  <Table>
    <TableHead>
      <TableRow>
        {Object.keys(data[0]).map((key) => (
          <TableCell key={key}>{key}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={i * 100 + Math.random()}>
          {Object.values(row).map((value, j) => (
            <TableCell key={`j--${(value as string) + j}`}>{value as string}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default JsonTable;

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';

interface buttonOpt {
  text: string;
  handler: Function;
}

interface options {
  data: any;
  optGroup?: buttonOpt[];
}

const JsonTable: React.FC<options> = ({ data = [], optGroup = [] }) => (
    <Table>
      <TableHead>
        <TableRow>
          {data && data.length > 0 ? (
            Object.keys(data[0]).map((key) => <TableCell key={key}>{key}</TableCell>)
          ) : (
            <TableCell>无数据</TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={i * 100 + JSON.stringify(row)}>
            {Object.values(row).map((value, j) => (
              <TableCell key={`j--${(value as string) + j}--${Math.random()}`}>
                {value as string}
              </TableCell>
            ))}
            {optGroup?.map((opt: buttonOpt, o) => (
              <TableCell key={`o--${opt.text + o}`}>
                <Button variant="contained" onClick={() => opt.handler(row)}>
                  {opt.text}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
export default JsonTable;

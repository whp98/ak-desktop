// 投资分析师列表 stock_analyst_rank_em
import React, { useState } from 'react';
import { Button, TableContainer, TextField } from '@mui/material';
import JsonTable from '@/renderer/components/base/JsonTable';
import akrq from '@/renderer/api/Akrq';

const AkInvestmentAnalyst = () => {
  const [year, setYear] = useState('2023');
  const [data, setData] = useState([{}]);

  const handleSearch = () => {
    akrq.instance.get('stock_analyst_rank_em', { "params": { year } }).then((r) => {
      setData(r.data);
    });
  };

  return (
    <div style={{ "display": 'flex', "flexDirection": 'column' }}>
      <div
        style={{
          "display": 'flex',
          "alignItems": 'center',
          "justifyContent": 'center',
        }}
      >
        <TextField label="Year" value={year} onChange={(e) => setYear(e.target.value as string)} />
        <Button variant="contained" onClick={handleSearch}>
          查询
        </Button>
      </div>
      <TableContainer>
        <JsonTable data={data} />
      </TableContainer>
    </div>
  );
};

export default AkInvestmentAnalyst;

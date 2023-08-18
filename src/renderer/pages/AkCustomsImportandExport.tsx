// 海关进出口数据
import React, { useEffect, useState } from 'react';
import { Button, TableContainer } from '@mui/material';
import JsonTable from '@/renderer/components/base/JsonTable';
import akrq from '@/renderer/api/Akrq';

const AkInvestmentAnalyst = () => {
  const [data, setData] = useState([{}]);

  const handleSearch = () => {
    akrq.instance.get('macro_china_hgjck').then((r) => {
      setData(r.data);
    });
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div style={{ "display": 'flex', "flexDirection": 'column' }}>
      <div
        style={{
          "display": 'flex',
          "alignItems": 'center',
          "justifyContent": 'center',
        }}
      >
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

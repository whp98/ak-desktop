// 指数中心
// http://127.0.0.1:28080/api/public/stock_zh_index_spot

import React, { useEffect, useState } from 'react';
import { Button, TableContainer } from '@mui/material';
import JsonTable from '@/renderer/components/base/JsonTable';
import akrq from '@/renderer/api/Akrq';

const AkIndexCenter = () => {
  const [data, setData] = useState([{}]);
  const handleSearch = () => {
    akrq.instance.get('stock_zh_index_spot', {}).then((r) => {
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
          刷新
        </Button>
      </div>
      <TableContainer>
        <JsonTable data={data} />
      </TableContainer>
    </div>
  );
};

export default AkIndexCenter;

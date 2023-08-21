// 指数中心
// http://127.0.0.1:28080/api/public/stock_zh_index_spot

import React, { useEffect, useState } from 'react';
import { Button, TableContainer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JsonTable from '@/renderer/components/base/JsonTable';
import akrq from '@/renderer/api/Akrq';

const AkIndexCenter = () => {
  const [data, setData] = useState([{}]);
  const navigate = useNavigate();

  const handleSearch = () => {
    akrq.get('stock_zh_index_spot.cache_m', {}).then((r) => {
      setData(r.data);
    });
  };
  useEffect(() => {
    handleSearch();
  }, []);

  const optGroup = [
    {
      "text": '查看',
      "handler": (row) => {
        navigate('/index-daily', { "state": row });
      },
    },
  ];

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
        <JsonTable data={data} optGroup={optGroup} />
      </TableContainer>
    </div>
  );
};

export default AkIndexCenter;

import React, { useEffect, useState } from 'react';
import { Stack, TableContainer, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/renderer/components/layout/PageLayout';
import akrq from '@/renderer/api/Akrq';
import JsonTable from '@/renderer/components/base/JsonTable';

const AkStockTable = () => {
  const [list, setList] = useState([
    {
      "code": '请加载数据',
      "name": '请加载数据',
    },
  ]);
  const [filterText, setFilterText] = useState('');
  // eslint-disable-next-line no-undef
  const flushHandler = () => {
    akrq.get('stock_info_a_code_name').then((r) => {
      setList(r.data);
    });
  };
  const navigate = useNavigate();
  const optGroup = [
    {
      "text": 'k线1',
      "handler": (row) => {
        navigate('/stock-candlestick1', { "state": row });
      },
    },
    {
      "text": 'k线2',
      "handler": (row) => {
        navigate('/stock-candlestick2', { "state": row });
      },
    },
  ];
  useEffect(() => {
    flushHandler();
  }, []);
  return (
    <PageLayout>
      <Stack direction="column">
        <Stack display="flex" direction="row">
          <Button onClick={flushHandler}>刷新</Button>
          <TextField
            label={`搜索${list.length}只股票`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value as string)}
          />
        </Stack>
        <TableContainer>
          <JsonTable
            optGroup={optGroup}
            data={list
              .filter((item) => {
                if (filterText === null || filterText === undefined || filterText === '') {
                  return true;
                }
                return (
                  item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                  item.code.toLowerCase().includes(filterText.toLowerCase())
                );
              })
              .filter((item, index) => index < 10)}
          />
        </TableContainer>
      </Stack>
    </PageLayout>
  );
};

export default AkStockTable;

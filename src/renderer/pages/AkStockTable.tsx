import React, { useEffect, useState } from 'react';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import PageLayout from '@/renderer/components/layout/PageLayout';
import akrq from '@/renderer/api/Akrq';

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
    akrq.instance.get('stock_info_a_code_name').then((r) => {
      setList(r.data);
    });
  };
  useEffect(() => {
    flushHandler();
  }, []);
  return (
    <PageLayout>
      <Stack direction="column">
        <Stack display="flex" direction="row">
          <TextField
            label={`搜索${list.length}只股票`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value as string)}
          />
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>代码</TableCell>
                <TableCell>名称</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                .filter((item) => {
                  if (filterText === null || filterText === undefined || filterText === '') {
                    return true;
                  }
                  return (
                    item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.code.toLowerCase().includes(filterText.toLowerCase())
                  );
                })
                .map((item) => (
                  <TableRow key={item.code}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </PageLayout>
  );
};

export default AkStockTable;

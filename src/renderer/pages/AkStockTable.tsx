import React, {useState} from 'react';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import PageLayout from "@/renderer/components/layout/PageLayout";
import akrq from "@/renderer/api/Akrq";

interface StockRow {
  code: string;
  name: string;
}

let list: StockRow[] = [];
akrq.instance.get("stock_info_a_code_name")
  .then(r => {
    list = r.data;
  })
const AkStockTable = () => {
  const [filterText, setFilterText] = useState('');
  // eslint-disable-next-line no-undef
  const [filterData, setFilterData] = useState<StockRow[]>([{
    "code": '000001',
    "name": '平安银行'
  }]);
  const blurHandler = () => {
    const filteredData = list.filter(item => {
      if (filterText === null || filterText === undefined || filterText === '') {
        return true
      }
        return (item.name.toLowerCase().includes(filterText.toLowerCase())
          || item.code.toLowerCase().includes(filterText.toLowerCase()))

    });
    setFilterData(filteredData)
  }
  return (
    <PageLayout>
      <Stack direction='column'>
        <TextField
          label="Search"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          onBlur={blurHandler}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>代码</TableCell>
                <TableCell>名称</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.map(item => (
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
}

export default AkStockTable;

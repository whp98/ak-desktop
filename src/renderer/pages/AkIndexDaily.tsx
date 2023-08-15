// 股票指数行情 stock_zh_index_daily
import React, { useEffect, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import akrq from '@/renderer/api/Akrq';
import { getOption } from '@/renderer/components/utils/echartCandlestickChart2';
import ECharts from '@/renderer/components/base/ECharts';

const AkIndexDaily = () => {
  const handleDateWrapper = (dataInput: any): any[] => {
    const res: any = [];
    for (let i = 0; i < dataInput.length; i += 1) {
      const currVal = dataInput[i];
      res[i] = [
        currVal.date.substring(0, 10),
        currVal.open,
        currVal.close,
        currVal.low,
        currVal.high,
        currVal.volume,
        /* currVal['成交量'],
        currVal['振幅'],
        currVal['涨跌幅'],
        currVal['涨跌额'],
        currVal['换手率'], */
      ];
    }
    return res;
  };
  const [echartOptions, setechartOptions] = useState({});
  const [index, setIndex] = useState('sh000001');
  const { state } = useLocation();
  const handleSearch = () => {
    akrq.instance
      .get('stock_zh_index_daily', {
        "params": {
          "symbol": index,
        },
      })
      .then((r) => {
        const dataArr = handleDateWrapper(r.data);
        const myOptions = getOption(dataArr);
        setechartOptions(myOptions);
      });
  };
  useEffect(() => {
    if (state && state['代码']) {
      setIndex(state['代码']);
    }
    handleSearch();
  }, [index]);

  return (
    <div style={{ "display": 'flex', "flexDirection": 'column' }}>
      <div
        style={{
          "display": 'flex',
          "alignItems": 'center',
          "justifyContent": 'center',
        }}
      >
        <TextField
          label="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value as string)}
        />
        <Button variant="contained" onClick={handleSearch}>
          刷新
        </Button>
      </div>
      <Stack direction="row">
        <ECharts option={echartOptions} />
      </Stack>
    </div>
  );
};

export default AkIndexDaily;
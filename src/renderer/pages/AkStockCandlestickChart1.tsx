import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import akrq from '@/renderer/api/Akrq';
// import {getLineChartOptions} from '@/renderer/pages/utils/echartLine'
import PageLayout from '@/renderer/components/layout/PageLayout';
import { getKlineOption } from '@/renderer/components/utils/echartK-lineChart';
import ECharts from '@/renderer/components/base/ECharts';

const AkStockCandlestickChart1 = (props) => {
  const [inputStock, setInputStock] = useState('600000');
  const [echartOptions, setechartOptions] = useState({});
  const { state } = useLocation();
  // 每当props改变的时候就会实时重新渲染
  useEffect(() => {
    if (state && state.code){
      setInputStock(state.code)
    }
    akrq.instance.get('stock_zh_a_hist', { "params": { "symbol": inputStock } }).then((r) => {
      // const myOptions = getKlineOption(r.data)
      const myOptions = getKlineOption(r.data);
      setechartOptions(myOptions);
    });
  }, [props, inputStock]);
  return (
    <PageLayout>
      <Stack direction="column" display="flex" padding="20px">
        <Stack direction="row">
          <TextField
            required
            fullWidth
            id="outlined-required"
            value={inputStock}
            onChange={(event) => {
              setInputStock(event.target.value as string);
            }}
            placeholder="stock"
            label="stock"
          />
        </Stack>
        <Stack direction="row">
          <ECharts option={echartOptions} />
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default AkStockCandlestickChart1;

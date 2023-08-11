import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import akrq from '@/renderer/api/Akrq';
// import {getLineChartOptions} from '@/renderer/pages/utils/echartLine'
import PageLayout from '@/renderer/components/layout/PageLayout';
import { getAction, getOption } from '@/renderer/components/utils/echartCandlestickChart2';
import ECharts from '@/renderer/components/base/ECharts';
import handleDateWrapper from '@/renderer/components/utils/stockDataWrapper';

const AkStockCandlestickChart2 = (props) => {
  const [inputStock, setInputStock] = useState('600000');
  const [echartOptions, setechartOptions] = useState({});
  const [echartAction, setechartAction] = useState({});

  // 每当props改变的时候就会实时重新渲染
  useEffect(() => {
    akrq.instance.get('stock_zh_a_hist', { "params": { "symbol": inputStock } }).then((r) => {
      // const myOptions = getKlineOption(r.data)
      const dataArr = handleDateWrapper(r.data);
      const myOptions = getOption(dataArr);
      const myAction = getAction(dataArr[0][0], dataArr[dataArr.length - 1][0]);
      setechartOptions(myOptions);
      setechartAction(myAction);
    });
    /* akrq.instance
      .get('https://echarts.apache.org/examples/data/asset/data/stock-DJI.json', {
        "params": { "symbol": inputStock },
      })
      .then((r) => {
        // const myOptions = getKlineOption(r.data)
        const dataArr = r.data;
        const myOptions = getOption(dataArr);
        // const myAction = getAction('2021-01-01', '2023-01-01');
        setechartOptions(myOptions);
        // setechartAction(myAction);
        setechartAction({});
      }); */
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
          <ECharts option={echartOptions} action={echartAction} />
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default AkStockCandlestickChart2;

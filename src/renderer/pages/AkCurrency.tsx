// currency_boc_safe

import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import akrq from '@/renderer/api/Akrq';
import ECharts from '@/renderer/components/base/ECharts';
import PageLayout from '@/renderer/components/layout/PageLayout';

const AkCurrency = () => {
  const [option, setOption] = useState<EChartsOption>({});

  function dataHandler(dataInput: any) {
    const res: any = [];
    for (let i = 0; i < dataInput.length; i += 1) {
      const currVal = dataInput[i];
      res[i] = [
        currVal['日期'].substring(0, 10),
        currVal['美元'] / 100,
        currVal['日元'] / 100,
        currVal['欧元'] / 100,
        currVal['英镑'] / 100,
        currVal['卢布'] / 100,
        currVal['澳元'] / 100,
        /* currVal['成交量'],
        currVal['振幅'],
        currVal['涨跌幅'],
        currVal['涨跌额'],
        currVal['换手率'], */
      ];
    }
    const options = {
      "dataset": {
        "source": res,
      },
      "title": {
        "text": `数据量: ${echarts.format.addCommas(res.length)}`,
      },
      "legend": {
        "data": ['美元', '日元', '欧元', '英镑', '卢布(兑换)', '澳元'],
      },
      "tooltip": {
        "trigger": 'axis',
        "axisPointer": {
          "type": 'line',
        },
      },
      "toolbox": {
        "feature": {
          "dataZoom": {
            "yAxisIndex": false,
          },
        },
      },
      "grid": [
        {
          "left": '10%',
          "right": '10%',
          "bottom": 200,
        },
        {
          "left": '10%',
          "right": '10%',
          "height": 80,
          "bottom": 80,
        },
      ],
      "xAxis": [
        {
          "type": 'category',
          "boundaryGap": false,
          // inverse: true,
          "axisLine": { "onZero": false },
          "splitLine": { "show": false },
          "min": 'dataMin',
          "max": 'dataMax',
        },
        {
          "type": 'category',
          "gridIndex": 1,
          "boundaryGap": false,
          "axisLine": { "onZero": false },
          "axisTick": { "show": false },
          "splitLine": { "show": false },
          "axisLabel": { "show": false },
          "min": 'dataMin',
          "max": 'dataMax',
        },
      ],
      "yAxis": [
        {
          "scale": true,
          "splitArea": {
            "show": true,
          },
        },
        {
          "scale": true,
          "gridIndex": 1,
          "splitNumber": 2,
          "axisLabel": { "show": false },
          "axisLine": { "show": false },
          "axisTick": { "show": false },
          "splitLine": { "show": false },
        },
      ],
      "dataZoom": [
        {
          "type": 'inside',
          "xAxisIndex": [0, 1],
          "start": 10,
          "end": 100,
        },
        {
          "show": true,
          "xAxisIndex": [0, 1],
          "type": 'slider',
          "bottom": 10,
          "start": 10,
          "end": 100,
        },
      ],
      "series": [
        {
          "name": '美元',
          "type": 'line',
          "xAxisIndex": 0,
          "yAxisIndex": 0,
          "large": true,
          "encode": {
            "x": 0,
            "y": 1,
          },
        },
        {
          "name": '日元',
          "type": 'line',
          "xAxisIndex": 0,
          "yAxisIndex": 0,
          "large": true,
          "encode": {
            "x": 0,
            "y": 2,
          },
        },
        {
          "name": '欧元',
          "type": 'line',
          "xAxisIndex": 0,
          "yAxisIndex": 0,
          "large": true,
          "encode": {
            "x": 0,
            "y": 3,
          },
        },
        {
          "name": '英镑',
          "type": 'line',
          "xAxisIndex": 0,
          "yAxisIndex": 0,
          "large": true,
          "encode": {
            "x": 0,
            "y": 4,
          },
        },
        {
          "name": '卢布(兑换)',
          "type": 'line',
          "xAxisIndex": 0,
          "yAxisIndex": 0,
          "large": true,
          "encode": {
            "x": 0,
            "y": 5,
          },
        },
        {
          "name": '澳元',
          "type": 'line',
          "xAxisIndex": 0,
          "yAxisIndex": 0,
          "large": true,
          "encode": {
            "x": 0,
            "y": 6,
          },
        },
      ],
    };
    // @ts-ignore
    setOption(options);
  }

  const buttonHandler = () => {
    akrq.instance.get('currency_boc_safe').then((r) => {
      const { data } = r;
      dataHandler(data);
    });
  };
  useEffect(() => {
    buttonHandler();
  }, []);
  return (
    <PageLayout>
      <Stack
        sx={{
          "display": 'flex',
          "direction": 'column',
          "minWidth": '800',
          "minHeight": '800',
        }}
      >
        <Button onClick={buttonHandler}>刷新</Button>
        <Alert severity="info">兑换是指1人民币兑换外币数量,否则是1外币兑换人民币数量</Alert>
        <ECharts option={option} />
      </Stack>
    </PageLayout>
  );
};

export default AkCurrency;

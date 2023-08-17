// 银行拆借利率

import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import akrq from '@/renderer/api/Akrq';
import PageLayout from '@/renderer/components/layout/PageLayout';
import ECharts from '@/renderer/components/base/ECharts';

const AkBankRateChart = () => {
  const [options, setOptions] = useState<EChartsOption>({});

  function dataHandler(dataInput: any) {
    const res: any = [];
    for (let i = 0; i < dataInput.length; i += 1) {
      const currVal = dataInput[i];
      res[i] = [currVal['报告日'].substring(0, 10), currVal['利率'], currVal['涨跌']];
    }
    const options1 = {
      "dataset": {
        "source": res,
      },
      "title": {
        "text": `数据量: ${echarts.format.addCommas(res.length)}`,
      },
      "legend": {
        "data": ['利率', '涨跌'],
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
          "boundaryGap": false,
          // inverse: true,
          "axisLine": { "onZero": false },
          "splitLine": { "show": false },
          "min": 'dataMin',
          "max": 'dataMax',
        },
      ],
      "yAxis": [
        { "name": '利率', "type": 'value' },
        { "name": '涨跌', "type": 'value' },
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
          "name": '利率',
          "type": 'line',
          "large": true,
          "yAxisIndex": 0,
          "encode": {
            "x": 0,
            "y": 1,
          },
        },
        {
          "name": '涨跌',
          "type": 'line',
          "large": true,
          "yAxisIndex": 1,
          "encode": {
            "x": 0,
            "y": 2,
          },
        },
      ],
    };
    // @ts-ignore
    setOptions(options1);
  }

  const handleButton = () => {
    akrq.instance.get('rate_interbank').then((r) => {
      dataHandler(r.data);
    });
  };
  useEffect(() => {
    handleButton();
  }, []);
  return (
    <PageLayout>
      <Stack
        sx={{
          "display": 'flex',
          "direction": 'column',
        }}
      >
        <Button onClick={handleButton}>刷新</Button>
        <ECharts option={options} />
      </Stack>
    </PageLayout>
  );
};

export default AkBankRateChart;

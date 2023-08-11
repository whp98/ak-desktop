// 油价历史 energy_oil_hist
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import ECharts from '@/renderer/components/base/ECharts';
import PageLayout from '@/renderer/components/layout/PageLayout';
import akrq from '@/renderer/api/Akrq';

const AkOilPrice = () => {
  const [options, setOptions] = useState<EChartsOption>({});

  function dataHandler(dataInput: any) {
    const res: any = [];
    for (let i = 0; i < dataInput.length; i += 1) {
      const currVal = dataInput[i];
      res[i] = [currVal['调整日期'].substring(0, 10), currVal['汽油价格'], currVal['柴油价格']];
    }
    const options1 = {
      "dataset": {
        "source": res,
      },
      "title": {
        "text": `数据量: ${echarts.format.addCommas(res.length)}`,
      },
      "legend": {
        "data": ['汽油价格', '柴油价格'],
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
      "xAxis": {
        "type": 'category',
        "boundaryGap": false,
        "axisLine": { "onZero": false },
        "splitLine": { "show": false },
        "min": 'dataMin',
        "max": 'dataMax',
      },
      "yAxis": {
        "scale": true,
        "splitArea": {
          "show": true,
        },
      },
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
          "name": '汽油价格',
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
          "name": '柴油价格',
          "type": 'line',
          "xAxisIndex": 0,
          "yAxisIndex": 0,
          "large": true,
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
    akrq.instance.get('energy_oil_hist').then((r) => {
      dataHandler(r.data);
    });
  };

  return (
    <PageLayout>
      <Stack
        sx={{
          "display": 'flex',
          "direction": 'column',
        }}
      >
        <Button onClick={handleButton}>刷新油价</Button>
        <ECharts option={options} />
      </Stack>
    </PageLayout>
  );
};

export default AkOilPrice;

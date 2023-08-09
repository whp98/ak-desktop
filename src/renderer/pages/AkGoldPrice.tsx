// 黄金基准价格 spot_golden_benchmark_sge
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import EChartsContainer from '@/renderer/components/chart/EChartsContainer';
import PageLayout from '@/renderer/components/layout/PageLayout';
import akrq from '@/renderer/api/Akrq';

const AkGoldPrice = () => {
  const [options, setOptions] = useState<EChartsOption>({});

  function dataHandler(dataInput: any) {
    const res: any = [];
    for (let i = 0; i < dataInput.length; i += 1) {
      const currVal = dataInput[i];
      res[i] = [currVal['交易时间'].substring(0, 10), currVal['早盘价'], currVal['晚盘价']];
    }
    const options1 = {
      dataset: {
        source: res,
      },
      title: {
        text: `Data Amount: ${echarts.format.addCommas(res.length)}`,
      },
      legend: {
        data: ['早盘价', '晚盘价'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false,
          },
        },
      },
      grid: [
        {
          left: '10%',
          right: '10%',
          bottom: 200,
        },
        {
          left: '10%',
          right: '10%',
          height: 80,
          bottom: 80,
        },
      ],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          // inverse: true,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
        {
          type: 'category',
          gridIndex: 1,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 10,
          end: 100,
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          bottom: 10,
          start: 10,
          end: 100,
        },
      ],
      series: [
        {
          name: '早盘价',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          large: true,
          encode: {
            x: 0,
            y: 1,
          },
        },
        {
          name: '晚盘价',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          large: true,
          encode: {
            x: 0,
            y: 2,
          },
        },
      ],
    };
    // @ts-ignore
    setOptions(options1);
  }

  const handleButton = () => {
    akrq.instance.get('spot_golden_benchmark_sge').then((r) => {
      dataHandler(r.data);
    });
  };

  return (
    <PageLayout>
      <Stack
        sx={{
          display: 'flex',
          direction: 'column',
        }}
      >
        <Button onClick={handleButton}>刷新黄金价格</Button>
        <EChartsContainer options={options} />
      </Stack>
    </PageLayout>
  );
};

export default AkGoldPrice;

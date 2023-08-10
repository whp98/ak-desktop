import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/src/util/types';

const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';
/* date , open, highest,lowest ,close, volumn */
type DataItem = [string, number, number, number, number, number, number];

/* 这个getSign()函数主要是用于计算某个数据点相对于前一个数据点的涨跌符号(sign)。

它接受以下参数:

- data:整个数据集
- dataIndex:当前数据点的索引
- openVal:当前数据点的开盘价
- closeVal:当前数据点的收盘价
- closeDimIdx:收盘价在data中的维度索引

函数逻辑是:

1. 比较当前开盘价和收盘价:

  - 如果开盘价 > 收盘价,sign为-1(负数,表示跌)

  - 如果开盘价 < 收盘价,sign为1(正数,表示涨)

2. 如果开盘价==收盘价,就需要与前一个数据点的closeVal比较:

  - 如果dataIndex>0,即存在前一个数据点,就比较当前closeVal和前一个closeVal。如果当前<=前一个,则sign为1,否则为-1。

  - 如果dataIndex==0,即第一个数据点,前面没有可以比较的,直接设置sign为1。

3. 最后返回得到的sign值。

总结一下,它通过当前数据点与前一个数据点的开盘收盘价的比较,来计算当前的数据点相对于前一个的涨跌符号。这个符号可以用于后续绘制K线图等金融数据分析场景。 */
function getSign(
  data: DataItem[],
  dataIndex: number,
  openVal: number,
  closeVal: number,
  closeDimIdx: number
) {
  let sign;
  if (openVal > closeVal) {
    sign = -1;
  } else if (openVal < closeVal) {
    sign = 1;
  } else {
    sign =
      dataIndex > 0
        ? // If close === open, compare with close of last record
        (data[dataIndex - 1][closeDimIdx] as number) <= (closeVal as number)
          ? 1
          : -1
        : // No record of previous, set to be positive
        1;
  }
  return sign;
}

export function generateOHLC(count: number) {
  const data: DataItem[] = [];

  let xValue = +new Date(2011, 0, 1);
  const minute = 60 * 1000;
  let baseValue = Math.random() * 12000;
  const boxVals = new Array(4);
  const dayRange = 12;

  for (let i = 0; i < count; i += 1) {
    baseValue = baseValue + Math.random() * 20 - 10;

    for (let j = 0; j < 4; j += 1) {
      boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
    }
    boxVals.sort();

    const openIdx = Math.round(Math.random() * 3);
    let closeIdx = Math.round(Math.random() * 2);
    if (closeIdx === openIdx) {
      // eslint-disable-next-line no-plusplus
      closeIdx++;
    }
    const volumn = boxVals[3] * (1000 + Math.random() * 500);

    // ['open', 'close', 'lowest', 'highest', 'volumn']
    // [1, 4, 3, 2]
    data[i] = [
      echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
      +boxVals[openIdx].toFixed(2), // open
      +boxVals[3].toFixed(2), // highest
      +boxVals[0].toFixed(2), // lowest
      +boxVals[closeIdx].toFixed(2), // close
      +volumn.toFixed(0),
      getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
    ];
  }
  return data;
}

const dataCount = 2e5;
// const data = generateOHLC(dataCount);

const handleDateWrapper = (dataInput: any): DataItem[] | null => {
  const res: any = []
  for (let i = 0; i < dataInput.length; i += 1) {
    const currVal = dataInput[i]
    res[i] = [
      currVal['日期'].substring(0,10),
      currVal['开盘'],
      currVal['最高'],
      currVal['最低'],
      currVal['收盘'],
      currVal['成交额'],
      /* currVal['成交量'],
      currVal['振幅'],
      currVal['涨跌幅'],
      currVal['涨跌额'],
      currVal['换手率'], */
    ]
  }
  return res;
}


export const getKlineOption = (dataInput) => {
  const option: ECBasicOption = {
    "dataset": {
      "source": handleDateWrapper(dataInput),
    },
    "title": {
      "text": `数据量: ${echarts.format.addCommas(dataCount)}`,
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
    "visualMap": {
      "show": false,
      "seriesIndex": 1,
      "dimension": 6,
      "pieces": [
        {
          "value": 1,
          "color": upColor,
        },
        {
          "value": -1,
          "color": downColor,
        },
      ],
    },
    "series": [
      {
        "type": 'candlestick',
        "itemStyle": {
          "color": upColor,
          "color0": downColor,
          "borderColor": upBorderColor,
          "borderColor0": downBorderColor,
        },
        "encode": {
          "x": 0,
          "y": [1, 4, 3, 2],
        },
      },
      {
        "name": 'Volumn',
        "type": 'bar',
        "xAxisIndex": 1,
        "yAxisIndex": 1,
        "itemStyle": {
          "color": '#7fbe9e',
        },
        "large": true,
        "encode": {
          "x": 0,
          "y": 5,
        },
      },
    ],
  };
  return option;
};

export default { getKlineOption };

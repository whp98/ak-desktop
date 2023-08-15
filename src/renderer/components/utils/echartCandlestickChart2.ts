const upColor = '#00da3c';
const downColor = '#ec0000';

function splitData(rawData: number[][]) {
  const categoryData: number[] = [];
  const values: number[][] = [];
  const volumes: number[][] = [];
  for (let i = 0; i < rawData.length; i += 1) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
  }
  return {
    "categoryData": categoryData,
    "values": values,
    "volumes": volumes,
  };
}

function calculateMA(dayCount: number, data: { values: number[][] }) {
  const result: any[] = [];
  for (let i = 0, len = data.values.length; i < len; i += 1) {
    if (i < dayCount) {
      result.push('-');
      // eslint-disable-next-line no-continue
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j += 1) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}

/*
 * [
 *   {
 *   date,
 *   open,
 *   close,
 *   low,
 *   high,
 *   vol
 * }
 * ]
 * */
const getOption = (dataInput) => {
  const data = splitData(dataInput);
  return {
    "animation": false,
    "legend": {
      "bottom": 10,
      "left": 'center',
      "data": ['stock', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60', 'MA120'],
      "selected": {
        "stock": true,
        "MA5": false,
        "MA10": false,
        "MA20": false,
        "MA30": false,
        "MA60": false,
        "MA120": false,
      },
    },
    "tooltip": {
      "trigger": 'axis',
      "axisPointer": {
        "type": 'cross',
      },
      "borderWidth": 1,
      "borderColor": '#ccc',
      "padding": 10,
      "textStyle": {
        "color": '#000',
      },
      "position": function (pos, params, el, elRect, size) {
        const obj: Record<string, number> = {
          "top": 10,
        };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      // extraCssText: 'width: 170px'
    },
    "axisPointer": {
      "link": [
        {
          "xAxisIndex": 'all',
        },
      ],
      "label": {
        "backgroundColor": '#777',
      },
    },
    "toolbox": {
      "feature": {
        "dataZoom": {
          "yAxisIndex": false,
        },
        "brush": {
          "type": ['lineX', 'clear'],
        },
      },
    },
    "brush": {
      "xAxisIndex": 'all',
      "brushLink": 'all',
      "outOfBrush": {
        "colorAlpha": 0.4,
      },
    },
    "visualMap": {
      "show": false,
      "seriesIndex": 6,
      "dimension": 2,
      "pieces": [
        {
          "value": 1,
          "color": downColor,
        },
        {
          "value": -1,
          "color": upColor,
        },
      ],
    },
    "grid": [
      {
        "left": '10%',
        "right": '8%',
        "height": '50%',
      },
      {
        "left": '10%',
        "right": '8%',
        "top": '63%',
        "height": '16%',
      },
    ],
    "xAxis": [
      {
        "type": 'category',
        "data": data.categoryData,
        "boundaryGap": false,
        "axisLine": { "onZero": false },
        "splitLine": { "show": false },
        "min": 'dataMin',
        "max": 'dataMax',
        "axisPointer": {
          "z": 100,
        },
      },
      {
        "type": 'category',
        "gridIndex": 1,
        "data": data.categoryData,
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
        "start": 98,
        "end": 100,
      },
      {
        "show": true,
        "xAxisIndex": [0, 1],
        "type": 'slider',
        "top": '85%',
        "start": 98,
        "end": 100,
      },
    ],
    "series": [
      {
        "name": 'stock',
        "type": 'candlestick',
        "data": data.values,
        "itemStyle": {
          "color": upColor,
          "color0": downColor,
          "borderColor": undefined,
          "borderColor0": undefined,
        },
      },
      {
        "name": 'MA5',
        "type": 'line',
        "symbol": 'none',
        "data": calculateMA(5, data),
        "smooth": true,
        "lineStyle": {
          "opacity": 1,
        },
      },
      {
        "name": 'MA10',
        "type": 'line',
        "symbol": 'none',
        "data": calculateMA(10, data),
        "smooth": true,
        "lineStyle": {
          "opacity": 1,
        },
      },
      {
        "name": 'MA20',
        "type": 'line',
        "symbol": 'none',
        "data": calculateMA(20, data),
        "smooth": true,
        "lineStyle": {
          "opacity": 1,
        },
      },
      {
        "name": 'MA30',
        "type": 'line',
        "symbol": 'none',
        "data": calculateMA(30, data),
        "smooth": true,
        "lineStyle": {
          "opacity": 1,
        },
      },
      {
        "name": 'MA60',
        "type": 'line',
        "symbol": 'none',
        "data": calculateMA(60, data),
        "smooth": true,
        "lineStyle": {
          "opacity": 1,
        },
      },
      {
        "name": 'Volume',
        "type": 'bar',
        "xAxisIndex": 1,
        "yAxisIndex": 1,
        "data": data.volumes,
      },
      {
        "name": 'MA120',
        "type": 'line',
        "symbol": 'none',
        "data": calculateMA(120, data),
        "smooth": true,
        "lineStyle": {
          "opacity": 1,
        },
      },
    ],
  };
};
const getAction = (startDate, endDate) => ({
  "type": 'brush',
  "areas": [
    {
      "brushType": 'lineX',
      "coordRange": [startDate, endDate],
      "xAxisIndex": 0,
    },
  ],
});

export { getAction, getOption };

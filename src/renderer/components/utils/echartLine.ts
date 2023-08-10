
export const getLineChartOptions = (data: any) => ({
  "xAxis": {
    "type": 'time',
    "data": data.map(d => d['时间'])
  },
  "yAxis": {
    "type": 'value'
  },
  "series": [
    {
      "data": data.map(d => d['收盘']),
      "type": 'line'
    }
  ]
})

export default {getLineChartOptions}

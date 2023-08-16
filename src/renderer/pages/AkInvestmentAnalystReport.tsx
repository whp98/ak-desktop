// 投资分析师报告 stock_analyst_rank_em
import React, { useEffect, useState } from 'react';
import { Button, TableContainer, TextField } from '@mui/material';
import * as echarts from 'echarts';
import { useLocation, useNavigate } from 'react-router-dom';
import JsonTable from '@/renderer/components/base/JsonTable';
import akrq from '@/renderer/api/Akrq';
import jsonMapToArray from '@/renderer/components/utils/tableUtils';
import ECharts from '@/renderer/components/base/ECharts';

const AkInvestmentAnalystReport = () => {
  const [analystId, setAnalystId] = useState('11000239662');
  const [data, setData] = useState([{}]);
  const [data1, setData1] = useState([{}]);
  const [op1, setOp1] = useState({});
  const { state } = useLocation();
  const handleSearch = () => {
    akrq.instance
      .get('stock_analyst_detail_em', {
        "params": {
          "analyst_id": analystId,
          "indicator": '最新跟踪成分股',
        },
      })
      .then((r) => {
        setData(r.data);
      });
    akrq.instance
      .get('stock_analyst_detail_em', {
        "params": {
          "analyst_id": analystId,
          "indicator": '历史跟踪成分股',
        },
      })
      .then((r) => {
        setData1(r.data);
      });
    akrq.instance
      .get('stock_analyst_detail_em', {
        "params": {
          "analyst_id": analystId,
          "indicator": '历史指数',
        },
      })
      .then((r) => {
        const json = jsonMapToArray(r.data);
        setOp1({
          "dataset": {
            "source": json,
          },
          "title": {
            "text": `数据量: ${echarts.format.addCommas(json.length)}`,
          },
          "legend": {
            "data": ['指数点'],
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
              "name": '指数点',
              "type": 'line',
              "xAxisIndex": 0,
              "yAxisIndex": 0,
              "large": true,
              "encode": {
                "x": 0,
                "y": 1,
              },
            },
          ],
        });
      });
  };
  // 返回分析师排行
  const nav = useNavigate();
  const backToList = () => {
    nav('/investment-analyst-rank');
  };

  // 每当props改变的时候就会实时重新渲染
  useEffect(() => {
    if (state && state['分析师ID']) {
      setAnalystId(state['分析师ID']);
    }
    handleSearch();
  }, [analystId]);
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
          label="分析师id"
          value={analystId}
          onChange={(e) => setAnalystId(e.target.value as string)}
        />
        <Button variant="contained" onClick={handleSearch}>
          查询
        </Button>
        <Button variant="outlined" onClick={backToList}>
          返回排行
        </Button>
      </div>
      <TableContainer>
        <h5>最新跟踪成分股</h5>
        <JsonTable data={data} />
      </TableContainer>
      <TableContainer>
        <h5>历史跟踪成分股</h5>
        <JsonTable data={data1} />
      </TableContainer>
      <TableContainer>
        <h5>历史指数</h5>
        <ECharts option={op1} />
      </TableContainer>
    </div>
  );
};

export default AkInvestmentAnalystReport;

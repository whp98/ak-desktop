import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

interface Props {
  option: echarts.EChartsOption;
  // eslint-disable-next-line react/require-default-props
  action?: object;
}

const ECharts: React.FC<Props> = ({ option, action }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chart: any = {};

    function handleResize() {
      if (chart && chartRef.current !== null) {
        chart.resize({
          "width": window.innerWidth - 250,
          "height": window.innerHeight - 250,
        });
        chart.setOption(option);
        if (action) {
          chart.dispatchAction(action);
        }
      }
    }

    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current);
      // 重要:设置option
      chart.setOption(option);
      if (action) {
        chart.dispatchAction(action);
      }
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.dispose();
      }
    };
  }, [option, action]);

  return (
    <div
      className="echarts-container"
      style={{
        "width": '100%',
        "height": '100%',
        "flex": 1,
      }}
      ref={chartRef}
    >
      <ReactECharts option={option} notMerge lazyUpdate />
    </div>
  );
};
export default ECharts;

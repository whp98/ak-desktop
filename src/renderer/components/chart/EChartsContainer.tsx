import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import ReactECharts from "echarts-for-react";

interface Props {
  options: echarts.EChartsOption;
}

const EChartsContainer: React.FC<Props> = ({options}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chart: any = {};
    function handleResize() {
      if (chart && chartRef.current !== null) {
        chart.resize({
          width: window.innerWidth-250,
          height: window.innerHeight-250
        });
        chart.setOption(options);
      }
    }

    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current);
      // 重要:设置option
      chart.setOption(options);
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.dispose();
      }
    }
  }, [options]);

  return (
    <div
      className="echarts-container"
      style={{
        width: '100%',
        height: '100%',
        flex: 1
      }}
      ref={chartRef}
    >
      <ReactECharts
        option={options}
        notMerge
        lazyUpdate
      />
    </div>
  )

};
export default EChartsContainer;

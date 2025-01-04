import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialBarChart = ({ series, options, width = 100, height = 100 }) => {
  return (
    <div style={{ width, height }}>
      <ReactApexChart
        options={options}
        series={series}
        type={options?.chart?.type || 'radialBar'}
        height={height}
        width={width}
      />
    </div>
  );
};

export default RadialBarChart;

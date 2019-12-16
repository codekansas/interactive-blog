import React from 'react';

interface Props {
  color: string;
  label: string;
}

const PlotterAxis = (props: Props) => {
  const { label, color, ...extraProps } = props;
  return [
    [...Array(9).keys()].map(i => (
      <line
        x1={i + 1}
        y1={0}
        x2={i + 1}
        y2={0.3}
        key={`tick_${i}`}
        style={{
          stroke: color,
          strokeWidth: 0.05,
        }}
        {...extraProps}
      />
    )),
    [...Array(9).keys()].map(i => (
      <line
        x1={-i - 1}
        y1={0}
        x2={-i - 1}
        y2={0.3}
        key={`neg_tick_${i}`}
        style={{
          stroke: color,
          strokeWidth: 0.05,
        }}
        {...extraProps}
      />
    )),
    <text
      x={-5.4}
      y={1}
      style={{
        fill: color,
        font: '0.7px sans-serif',
      }}
      key="text"
      {...extraProps}
    >
      -5
    </text>,
    <text
      x={4.8}
      y={1}
      style={{
        fill: color,
        font: '0.7px sans-serif',
      }}
      key="text"
      {...extraProps}
    >
      5
    </text>,
    <text
      x={-9.8}
      y={-0.3}
      style={{
        fill: color,
        font: '0.7px sans-serif',
      }}
      key="text"
      {...extraProps}
    >
      {label}
    </text>,
    <line
      x1={-10}
      y1={0}
      x2={10}
      y2={0}
      style={{
        stroke: color,
        strokeWidth: 0.05,
      }}
      key="axis"
      {...extraProps}
    />,
  ];
};

PlotterAxis.defaultProps = {
  color: '#AAAAAA',
};

export default PlotterAxis;

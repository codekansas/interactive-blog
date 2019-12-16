import React from 'react';

export interface Point {
  x: number;
  y: number;
}

interface Props {
  label: ?string;
  pt: ?Point;
  color: string;
}

const ComplexVector = (props: Props) => {
  const { pt, label, color } = props;
  if (pt == null) {
    return null;
  }
  return [
    <line
      x1={0}
      y1={pt.y}
      x2={pt.x}
      y2={pt.y}
      style={{
        stroke: color,
        strokeWidth: 0.05,
        strokeDasharray: '0.1, 0.2',
      }}
      key="line_vert"
    />,
    <line
      x1={pt.x}
      y1={0}
      x2={pt.x}
      y2={pt.y}
      style={{
        stroke: color,
        strokeWidth: 0.05,
        strokeDasharray: '0.1, 0.2',
      }}
      key="line_hori"
    />,
    <line
      x1={0}
      y1={0}
      x2={pt.x}
      y2={pt.y}
      style={{
        stroke: color,
        strokeWidth: 0.1,
      }}
      key="line"
    />,
    label == null ? null : (
      <text
        x={2}
        y={-0.3}
        style={{
          fill: color,
          font: '0.7px sans-serif',
        }}
        key="text"
        transform={`rotate(${(Math.atan2(pt.y, pt.x) * 180) / Math.PI} 0 0)`}
      >
        {label}
      </text>
    ),
  ];
};

ComplexVector.defaultProps = {
  color: '#12939A',
};

export default ComplexVector;

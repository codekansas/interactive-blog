import React, { FunctionalComponent } from "react";

interface Props {
  hour: number;
  minute: number;
  second: number;
}

const Clock: FunctionalComponent = (props: Props) => {
  const { hour, minute, second, ...other_props } = props;

  const hourAngle = (360 * hour) / 12 + minute / 2;
  const minuteAngle = (360 * minute) / 60;
  const secondAngle = (360 * second) / 60;

  const ticks = [...Array(12).keys()].map((i) => (
    <line
      x1={100}
      y1={30}
      x2={100}
      y2={40}
      transform={`rotate(${(i * 360) / 12} 100 100)`}
      style={{ stroke: "#fff" }}
      key={`tick-${i}`}
    />
  ));

  return (
    <div
      className="clock-container"
      style={{ paddingTop: "1em", paddingBottom: "1em", textAlign: "center" }}
      {...other_props}
    >
      <h2 style={{ width: "100%" }}>
        {hour}:{minute}:{second}
      </h2>
      <div className="filler"></div>
      <svg width="200" height="200">
        <g>
          <circle
            id="circle"
            style={{ stroke: "#555", strokeWidth: "1px", fill: "#20B7AF" }}
            cx="100"
            cy="100"
            r="80"
          ></circle>
        </g>
        <g>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="55"
            style={{ strokeWidth: "3px", stroke: "#fffbf9" }}
            transform={`rotate(${hourAngle} 100 100)`}
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="40"
            style={{ strokeWidth: "4px", stroke: "#fdfdfd" }}
            transform={`rotate(${minuteAngle} 100 100)`}
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            style={{ strokeWidth: "2px", stroke: "#C1EFED" }}
            transform={`rotate(${secondAngle} 100 100)`}
          />
        </g>
        <circle
          id="center"
          style={{ fill: "#128A86", stroke: "#C1EFED", strokeWidth: "2px" }}
          cx="100"
          cy="100"
          r="3"
        ></circle>
        {ticks}
      </svg>
    </div>
  );
};

export default Clock;

import React, { Component } from 'react';
import ComplexVector from 'components/posts/complex_variables/ComplexVector.react';
import PlotterAxis from 'components/posts/complex_variables/PlotterAxis.react';

export interface Point {
  x: number;
  y: number;
}

export interface Func {
  name: string;
  func: Point => Point;
}

interface Props {
  funcs: Array<Func>;
  xLabel: string;
  yLabel: string;
}

interface State {
  pt: ?Point;
}

class Plotter extends Component<Props, State> {
  static defaultProps = {
    xLabel: 'X-Axis',
    yLabel: 'Y-Axis',
  };

  constructor(props) {
    super(props);
    const pt = null;
    this.state = { pt };
  }

  onMouseMove = (e) => {
    const point = this.svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const svgPoint = point.matrixTransform(this.svg.getScreenCTM().inverse());
    const pt = { x: svgPoint.x, y: svgPoint.y };
    this.setState({ pt });
  };

  onMouseLeave = () => {
    this.setState({ pt: null });
  };

  render() {
    const {
      funcs, xLabel, yLabel,
    } = this.props;
    const { pt } = this.state;
    const newPts = pt == null ? [] : funcs.map(f => ({ name: f.name, pt: f.func(pt) }));
    return (
      <svg
        style={{
          border: '0.1px solid black',
        }}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        ref={(svg) => {
          this.svg = svg;
        }}
        viewBox="-10 -10 20 20"
      >
        <PlotterAxis label={xLabel} />
        <PlotterAxis label={yLabel} transform="rotate(90, 0, 0)" />
        <ComplexVector pt={pt} color="#555555" />
        {newPts.map(newPt => (
          <ComplexVector label={newPt.name} pt={newPt.pt} key={newPt.name} />
        ))}
      </svg>
    );
  }
}

export default Plotter;

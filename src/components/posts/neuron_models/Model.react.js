import React, { Component } from 'react';
import {
  Button, Form, InputGroup, Col,
} from 'react-bootstrap';
import 'react-vis/dist/style.css';
import {
  XAxis, YAxis, LineSeries, FlexibleWidthXYPlot, Crosshair,
} from 'react-vis';
import LazyLoad from 'react-lazyload';

export interface Param {
  key: string,
  name: string,
  unit: ?string,
  value: number,
  stepValue: number,
}

interface Props {
  params: Array<Param>,
  defaultTargetParamKey: string,
  model: (Map<string, number>, number) => Map<string, number>,
}

interface State {
  params: Array<Param>,
  targetParamKey: string,
}

interface RendererProps {
  params: Array<Param>,
  targetParamKey: string,
  model: (Map<string, number>, number) => Map<string, number>,
  ylabel: string,
  dt: number,
  totalTime: number,
  height: number,
}

interface RendererState {
  nearestValue: ?any,
}

class ModelRenderer extends Component<RendererProps, RendererState> {
  state = {
    nearestValue: null,
  }

  runModel(): Array<number> {
    const {
      params, model, dt, totalTime, targetParamKey,
    } = this.props;
    const steps = totalTime / dt;
    const initialParams = new Map(params.map(
      p => [p.key, p.value],
    ));
    const modelResults = [...Array(steps).keys()].reduce(
      (r, i) => {
        const newParams = model(r.params, dt, i * dt);
        r.results.push({
          x: i * dt,
          y: newParams.get(targetParamKey),
        });
        return {
          params: newParams,
          results: r.results,
        };
      },
      {
        params: initialParams,
        results: [],
      },
    );
    const { results } = modelResults;
    return results;
  }

  render() {
    const {
      params, model, height, ylabel,
    } = this.props;
    const data = this.runModel(params, model);
    const { nearestValue } = this.state;
    return (
      <FlexibleWidthXYPlot
        height={height}
        onMouseLeave={() => this.setState({ nearestValue: null })}
      >
        <XAxis title="Time (ms)" />
        <YAxis title={ylabel} />
        <LineSeries
          strokeStyle="dashed"
          data={data}
          onNearestX={v => this.setState({ nearestValue: v })}
        />
        {nearestValue == null
          ? null
          : (
            <Crosshair
              values={[nearestValue]}
              titleFormat={i => ({
                title: 'Time (ms)',
                value: `${Math.round(i[0].x * 10000) / 10000}`,
              })}
              itemsFormat={i => i.map(j => ({
                title: ylabel,
                value: `${Math.round(j.y * 10000) / 10000}`,
              }))}
            />
          )}
      </FlexibleWidthXYPlot>
    );
  }
}

class Model extends Component<Props, State> {
  static defaultProps = {
    height: 300,
  }

  constructor(props) {
    super(props);
    const { params, defaultTargetParamKey } = props;
    this.state = {
      params,
      targetParamKey: defaultTargetParamKey,
    };
  }

  handleSubmit = (event) => {
    const { params } = this.props;
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const newParams = params.map((param) => {
      const {
        key, name, unit, stepValue,
      } = param;
      const value = parseFloat(form[key].value);
      return {
        key, name, unit, value, stepValue,
      };
    });
    const targetParamKey = form.out_var.value;
    this.setState({
      params: newParams,
      targetParamKey,
    });
  }

  renderModel(): React.Node {
    const { model, height } = this.props;
    const { params, targetParamKey } = this.state;
    const { name, unit } = params.find(e => e.key === targetParamKey);
    const ylabel = unit == null ? name : `${name} (${unit})`;
    return (
      <div>
        <LazyLoad height={height}>
          <ModelRenderer
            params={params}
            targetParamKey={targetParamKey}
            model={model}
            ylabel={ylabel}
            dt={0.04}
            totalTime={100}
            height={height}
          />
        </LazyLoad>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            {params.map(param => (
              <Form.Group key={param.key} controlId={param.key} as={Col} md="3">
                <Form.Label>{param.name}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder={param.name}
                    defaultValue={param.value}
                    step={param.stepValue}
                    required
                  />
                  {param.unit == null
                    ? null
                    : (
                      <InputGroup.Append>
                        <InputGroup.Text>{param.unit}</InputGroup.Text>
                      </InputGroup.Append>
                    )}
                </InputGroup>
              </Form.Group>
            ))}
            <Form.Group controlId="out_var" as={Col} md="3">
              <Form.Label>Output Variable</Form.Label>
              <Form.Control
                as="select"
                defaultValue={targetParamKey}
                required
              >
                {params.map(param => (
                  <option value={param.key} key={param.key}>{param.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group key="submit" as={Col} md="3">
              <Form.Label>Update Params</Form.Label>
              <InputGroup>
                <Button type="submit">Update</Button>
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }

  render() {
    return this.renderModel();
  }
}

export default Model;

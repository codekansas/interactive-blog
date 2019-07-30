import React, { FunctionalComponent } from 'react';
import Model, { Param } from './Model.react';

const ModelParams: Array<Param> = [
  {
    key: 'a',
    name: 'a Variable',
    unit: null,
    value: 0.02,
    stepValue: 0.001,
  },
  {
    key: 'b',
    name: 'b Variable',
    unit: null,
    value: 0.2,
    stepValue: 0.01,
  },
  {
    key: 'c',
    name: 'c Variable',
    unit: null,
    value: -50,
    stepValue: 1,
  },
  {
    key: 'd',
    name: 'd Variable',
    unit: null,
    value: 2,
    stepValue: 0.01,
  },
  {
    key: 'v_in',
    name: 'Input Voltage',
    unit: 'mV',
    value: 0,
    stepValue: 1,
  },
  {
    key: 'v_in_level',
    name: 'Input Voltage Step',
    unit: 'mV',
    value: 20,
    step_value: 1,
  },
  {
    key: 'v_thresh',
    name: 'Threshold Voltage',
    unit: 'mV',
    value: 30,
    stepValue: 1,
  },
  {
    key: 'v_mem',
    name: 'Membrane Voltage',
    unit: 'mV',
    value: -60,
    stepValue: 1,
  },
  {
    key: 'u',
    name: 'u Variable',
    unit: null,
    value: 0.5,
    stepValue: 0.01,
  },
  {
    key: 'start_time',
    name: 'Stimulation Start Time',
    unit: 'ms',
    value: 20,
    stepValue: 1,
  },
];

const modelStep = (
  inputs: Map<string, number>,
  dt: number,
  t: number,
): Map<string, number> => {
  const a = inputs.get('a');
  const b = inputs.get('b');
  const c = inputs.get('c');
  const d = inputs.get('d');
  const vThresh = inputs.get('v_thresh');
  const vIn = inputs.get('v_in');
  const vMem = inputs.get('v_mem');
  const u = inputs.get('u');

  const dv = (0.04 * vMem * vMem + 5 * vMem + 140 - u + vIn) * dt;
  const du = (a * (b * vMem - u)) * dt;

  const vMemNew = vMem + dv;
  const uNew = u + du;

  if (t >= inputs.get('start_time')) {
    inputs.set('v_in', inputs.get('v_in_level'));
  }

  if (vMemNew >= vThresh) {
    inputs.set('v_mem', c);
    inputs.set('u', uNew + d);
  } else {
    inputs.set('v_mem', vMemNew);
    inputs.set('u', uNew);
  }

  return inputs;
};

const Izhikevich: FunctionalComponent = () => (
  <Model
    params={ModelParams}
    defaultTargetParamKey="v_mem"
    model={modelStep}
  />
);

export default Izhikevich;

import React, { FunctionalComponent } from 'react';
import Model, { Param } from './Model.react';

const ModelParams: Array<Param> = [
  {
    key: 'tau_m',
    name: 'Time Constant',
    unit: 'ms',
    value: 12.5,
    stepValue: 0.5,
  },
  {
    key: 'a',
    name: 'a Variable',
    unit: null,
    value: 0.7,
    stepValue: 0.01,
  },
  {
    key: 'b',
    name: 'b Variable',
    unit: null,
    value: 0.8,
    stepValue: 0.01,
  },
  {
    key: 'w',
    name: 'w Variable',
    unit: null,
    value: 0,
    stepValue: 0.01,
  },
  {
    key: 'v_mem',
    name: 'Membrane Voltage',
    unit: 'mV',
    value: 0,
    stepValue: 1,
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
    value: 500,
    stepValue: 1,
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
  const tauM = inputs.get('tau_m');
  const a = inputs.get('a');
  const b = inputs.get('b');
  const w = inputs.get('w');
  const vIn = inputs.get('v_in') / 1000.0;
  const vMem = inputs.get('v_mem') / 1000.0;

  const dv = (vMem - (vMem * vMem * vMem) / 3 - w + vIn) * dt;
  const dw = (vMem + a - (b * w)) * dt;
  const vMemNew = vMem + dv;
  const wNew = w + (dw / tauM);

  if (t >= inputs.get('start_time')) {
    inputs.set('v_in', inputs.get('v_in_level'));
  }

  inputs.set('v_mem', vMemNew * 1000.0);
  inputs.set('w', wNew);

  return inputs;
};

const FitzHughNagumo: FunctionalComponent = () => (
  <Model
    params={ModelParams}
    defaultTargetParamKey="v_mem"
    model={modelStep}
  />
);

export default FitzHughNagumo;

import React, { FunctionalComponent } from 'react';
import Model, { Param } from './Model.react';

const ModelParams: Array<Param> = [
  {
    key: 'v_reset',
    name: 'Reset Voltage',
    unit: 'mV',
    value: -60,
    stepValue: 1,
  },
  {
    key: 'v_thresh',
    name: 'Threshold Voltage',
    unit: 'mV',
    value: 15,
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
    value: 20,
    stepValue: 1,
  },
  {
    key: 'tau_m',
    name: 'Time Constant',
    unit: 'ms',
    value: 10,
    stepValue: 1,
  },
  {
    key: 'v_mem',
    name: 'Membrane Voltage',
    unit: 'mV',
    value: 0,
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
  const vReset = inputs.get('v_reset');
  const vThresh = inputs.get('v_thresh');
  const vIn = inputs.get('v_in');
  const vMem = inputs.get('v_mem');
  const tauM = inputs.get('tau_m');

  const dv = ((vIn - vMem) / tauM) * dt;
  const vMemNew = vMem + dv;
  const vMemReset = vMemNew > vThresh ? vReset : vMemNew;

  if (t >= inputs.get('start_time')) {
    inputs.set('v_in', inputs.get('v_in_level'));
  }

  inputs.set('v_mem', vMemReset);

  return inputs;
};

const LeakyIntegrateAndFire: FunctionalComponent = () => (
  <Model
    params={ModelParams}
    defaultTargetParamKey="v_mem"
    model={modelStep}
  />
);

export default LeakyIntegrateAndFire;

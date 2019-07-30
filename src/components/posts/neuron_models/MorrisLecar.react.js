import React, { FunctionalComponent } from 'react';
import Model, { Param } from './Model.react';

const ModelParams: Array<Param> = [
  {
    key: 'cap',
    name: 'Membrane Capacitance',
    unit: 'uF / cm * cm',
    value: 20,
    stepValue: 0.1,
  },
  {
    key: 'e_k',
    name: 'Potassium Reversal Potential',
    unit: 'mV',
    value: -84,
    stepValue: 1,
  },
  {
    key: 'e_ca',
    name: 'Calcium Reversal Potential',
    unit: 'mV',
    value: 120,
    stepValue: 1,
  },
  {
    key: 'e_l',
    name: 'Leak Potential',
    unit: 'mV',
    value: -60,
    stepValue: 1,
  },
  {
    key: 'g_k',
    name: 'Potassium Conductance',
    unit: 'mS / cm * cm',
    value: 8,
    stepValue: 0.1,
  },
  {
    key: 'g_ca',
    name: 'Calcium Conductance',
    unit: 'mS / cm * cm',
    value: 4,
    stepValue: 0.1,
  },
  {
    key: 'g_l',
    name: 'Leak Conductance',
    unit: 'mS / cm * cm',
    value: 2,
    stepValue: 0.1,
  },
  {
    key: 'v1',
    name: 'V1 Tuning Param',
    unit: 'mV',
    value: -1.2,
    stepValue: 0.1,
  },
  {
    key: 'v2',
    name: 'V2 Tuning Param',
    unit: 'mV',
    value: 18,
    stepValue: 0.1,
  },
  {
    key: 'v3',
    name: 'V3 Tuning Param',
    unit: 'mV',
    value: 12,
    stepValue: 0.1,
  },
  {
    key: 'v4',
    name: 'V4 Tuning Param',
    unit: 'mV',
    value: 17,
    stepValue: 0.1,
  },
  {
    key: 'phi',
    name: 'Reference Frequency',
    unit: null,
    value: 0.067,
    stepValue: 0.001,
  },
  {
    key: 'n',
    name: 'n Variable',
    unit: null,
    value: 0.014,
    stepValue: 0.001,
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
    value: 100,
    stepVallue: 1,
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
  const cap = inputs.get('cap');
  const eCa = inputs.get('e_ca');
  const eK = inputs.get('e_k');
  const eL = inputs.get('e_l');
  const gCa = inputs.get('g_ca');
  const gK = inputs.get('g_k');
  const gL = inputs.get('g_l');
  const vIn = inputs.get('v_in');
  const vMem = inputs.get('v_mem');
  const phi = inputs.get('phi');
  const v1 = inputs.get('v1');
  const v2 = inputs.get('v2');
  const v3 = inputs.get('v3');
  const v4 = inputs.get('v4');
  const n = inputs.get('n');

  const mss = 0.5 * (1 + Math.tanh((vMem - v1) / v2));
  const nss = 0.5 * (1 + Math.tanh((vMem - v3) / v4));
  const tauN = 1 / (phi * Math.cosh((vMem - v3) / (2 * v4)));

  const dv = ((
    vIn
    - (gL * (vMem - eL))
    - (gCa * mss * (vMem - eCa))
    - (gK * n * (vMem - eK))
  ) * dt / cap);
  const dn = ((nss - n) / tauN) * dt;

  inputs.set('v_mem', vMem + dv);
  inputs.set('n', n + dn);

  if (t >= inputs.get('start_time')) {
    inputs.set('v_in', inputs.get('v_in_level'));
  }

  return inputs;
};

const MorrisLecar: FunctionalComponent = () => (
  <Model
    params={ModelParams}
    defaultTargetParamKey="v_mem"
    model={modelStep}
  />
);

export default MorrisLecar;

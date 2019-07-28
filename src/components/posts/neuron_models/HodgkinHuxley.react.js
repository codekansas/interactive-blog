import React, { FunctionalComponent } from 'react';
import Model, { Param } from './Model.react';

const ModelParams: Array<Param> = [
  {
    key: 'e_na',
    name: 'Sodium Reversal Potential',
    unit: 'mV',
    value: 50,
    stepValue: 1,
  },
  {
    key: 'e_k',
    name: 'Potassium Reversal Potential',
    unit: 'mV',
    value: -77,
    stepValue: 1,
  },
  {
    key: 'e_l',
    name: 'Leak Potential',
    unit: 'mV',
    value: -54,
    stepValue: 1,
  },
  {
    key: 'g_na',
    name: 'Sodium Conductance',
    unit: 'mS / cm * cm',
    value: 120,
    stepValue: 1,
  },
  {
    key: 'g_k',
    name: 'Potassium Conductance',
    unit: 'mS / cm * cm',
    value: 36,
    stepValue: 1,
  },
  {
    key: 'g_l',
    name: 'Leak Conductance',
    unit: 'mS / cm * cm',
    value: 0.3,
    stepValue: 0.01,
  },
  {
    key: 'v_in',
    name: 'Input Voltage',
    unit: 'mV',
    value: 20,
    stepValue: 1,
  },
  {
    key: 'v_mem',
    name: 'Membrane Voltage',
    unit: 'mV',
    value: -65,
    stepValue: 1,
  },
  {
    key: 'm',
    name: 'm Variable',
    unit: null,
    value: 0.05,
    stepValue: 0.001,
  },
  {
    key: 'h',
    name: 'h Variable',
    unit: null,
    value: 0.6,
    stepValue: 0.001,
  },
  {
    key: 'n',
    name: 'n Variable',
    unit: null,
    value: 0.32,
    stepValue: 0.001,
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
  const eNa = inputs.get('e_na');
  const eK = inputs.get('e_k');
  const eL = inputs.get('e_l');
  const gNa = inputs.get('g_na');
  const gK = inputs.get('g_k');
  const gL = inputs.get('g_l');
  const vIn = t < inputs.get('start_time') ? 0 : inputs.get('v_in');
  const vMem = inputs.get('v_mem');
  const m = inputs.get('m');
  const n = inputs.get('n');
  const h = inputs.get('h');

  const iNa = gNa * m * m * m * h * (vMem - eNa);
  const iK = gK * n * n * n * n * (vMem - eK);
  const iL = gL * (vMem - eL);
  const dv = (vIn - iNa - iK - iL) * dt;

  const vOffsetM = vMem + 40;
  const alphaM = 0.1 * vOffsetM / (1.0 - Math.exp(-vOffsetM / 10));
  const alphaH = 0.07 * Math.exp(-(vMem + 65) / 20);
  const vOffsetN = vMem + 55;
  const alphaN = 0.01 * vOffsetN / (1.0 - Math.exp(-vOffsetN / 10));

  const betaM = 4.0 * Math.exp(-(vMem + 65) / 18);
  const betaH = 1.0 / (1.0 + Math.exp(-(vMem + 35) / 10));
  const betaN = 0.125 * Math.exp(-(vMem + 65) / 80);

  const dm = (alphaM * (1.0 - m) - betaM * m) * dt;
  const dh = (alphaH * (1.0 - h) - betaH * h) * dt;
  const dn = (alphaN * (1.0 - n) - betaN * n) * dt;

  inputs.set('m', m + dm);
  inputs.set('h', h + dh);
  inputs.set('n', n + dn);
  inputs.set('v_mem', vMem + dv);

  return inputs;
};

const HodgkinHuxley: FunctionalComponent = () => (
  <Model
    params={ModelParams}
    defaultTargetParamKey="v_mem"
    model={modelStep}
  />
);

export default HodgkinHuxley;

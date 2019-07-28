import React, { FunctionalComponent } from 'react';
import LeakyIntegrateAndFire from 'components/posts/neuron_models/LeakyIntegrateAndFire.react';
import Izhikevich from 'components/posts/neuron_models/Izhikevich.react';
import HodgkinHuxley from 'components/posts/neuron_models/HodgkinHuxley.react';

const NeuronModels: FunctionalComponent = () => (
  <div>
    <h3>
      Leaky Integrate and Fire Model
    </h3>
    <div>
      This is the simplest kind of neuron model. It consists of two parts:
      <ol>
        <li>
          Slow leakage of ions across the membrane, which is represented as a resistor
        </li>
        <li>
          Voltage difference across the membrane which triggers voltage-gated channels to
          open when it reaches a certain threshold, which is represented as a capacitor
        </li>
      </ol>
    </div>
    <div className="emphasis top-bottom">
      <LeakyIntegrateAndFire />
    </div>
    <h3>
      Izhikevich Model
    </h3>
    <div>
      Something about this model...
    </div>
    <div className="emphasis top-bottom">
      <Izhikevich />
    </div>
    <h3>
      Hodgkin-Huxley Model
    </h3>
    <div>
      This is a much more advanced kind of model.
    </div>
    <div className="emphasis top-bottom">
      <HodgkinHuxley />
    </div>
  </div>
);

export default NeuronModels;

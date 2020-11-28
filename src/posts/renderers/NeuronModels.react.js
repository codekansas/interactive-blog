import React, { FunctionalComponent } from "react";
import "css/pages/Post.scss";
import FitzHughNagumo from "components/posts/neuron_models/FitzHughNagumo.react";
import Izhikevich from "components/posts/neuron_models/Izhikevich.react";
import HodgkinHuxley from "components/posts/neuron_models/HodgkinHuxley.react";
import LeakyIntegrateAndFire from "components/posts/neuron_models/LeakyIntegrateAndFire.react";
import MorrisLecar from "components/posts/neuron_models/MorrisLecar.react";

interface SectionProps {
  title: React.Node;
  description: React.Node;
  model: React.Node;
}

const NeuronModelSection: FunctionalComponent<SectionProps> = (
  props: SectionProps
) => {
  const { title, description, model } = props;
  return [
    <div className="post-body emphasis top" key="body">
      <h3>{title}</h3>
      <div>{description}</div>
    </div>,
    <div className="emphasis top" key="model">
      {model}
    </div>,
  ];
};

const NeuronModels: FunctionalComponent = () => (
  <div className="post-body">
    <h3>Biological Neuron Models</h3>
    <div>
      In the early days of neural networks, before we had tons of data and
      high-performing GPU libraries, neural networks actually meant something
      roughly biological. The McCulloch-Pitts neuron, which is effectively a
      perceptron with a binary threshold, was inspired by real neurons, which
      get inputs from outside sources like other neurons and, if the inputs are
      collectively large enough, output a spike. More complex models were
      developed to better model the actual physiology, as measured through
      experiments, which has resulted in a comprehensive library of models of
      varying complexity. The models below are some of the more popular models
      used in computational neuroscience.
    </div>
    <h3 className="emphasis top">Markov Models</h3>
    <div>
      The models described here are Markov models, meaning that the future state
      can be entirely described by the current state, irrespective to past
      events. These models use one or more state variables - the simplest state
      variable being the membrane potential. These models are typically
      differential equations, and we can throw them into a forward solver to
      solve them very simply (although more complex solvers are usually better
      at handling numerical instability). Non-Markovian models also exist.
    </div>
    <NeuronModelSection
      title="Leaky Integrate and Fire Model"
      description={
        <>
          This is the simplest kind of neuron model. It consists of two parts:
          <ol>
            <li>
              Slow leakage of ions across the membrane, which is represented as
              a resistor
            </li>
            <li>
              Voltage difference across the membrane which triggers
              voltage-gated channels to open when it reaches a certain
              threshold, which is represented as a capacitor
            </li>
          </ol>
        </>
      }
      model={<LeakyIntegrateAndFire />}
    />
    <NeuronModelSection
      title="Izhikevich Model"
      description={
        <>
          This is a simple model that reproduces spiking and bursting behavior
          of known types of cortical neurons. A full description of this model's
          behavior, along with new parameters you can try, can be found{" "}
          <a href="https://www.izhikevich.org/publications/spikes.htm">here</a>.
        </>
      }
      model={<Izhikevich />}
    />
    <NeuronModelSection
      title="Hodgkin-Huxley Model"
      description={
        <>
          This is a much more advanced kind of model, which attempts to
          accurately mimic the biological mechanisms by explicitly modeling the
          ion channels on the surface of the neuron. This was one of the first
          biological neuron models to be developed, and is viewed as an accurate
          representation of some types of physiology. It uses four variables to
          represent the different kinds of kinetics, instead of just using the
          membrane potential like in other models.
        </>
      }
      model={<HodgkinHuxley />}
    />
    <NeuronModelSection
      title="FitzHugh-Nagumo Model"
      description={
        <>
          This model is a simplified version of the Hodgkin-Huxley model. It
          uses a feedback loop variable to enable the model to learn more
          complex dynamics than the simple LIF model, but it doesn't have clear
          biological correlates. In particular, the voltage range is well
          outside the voltage range for typical neuron models.
        </>
      }
      model={<FitzHughNagumo />}
    />
    <NeuronModelSection
      title="Morris-Lecar Model"
      description={
        <>
          This model describes the relationship between calcium and potassium
          conductances in the muscle fiber of the giant barnacle. As opposed to
          other models which model the relationship between sodium and
          potassium, muscle fiber synapse potentials are typically more
          dependent on calcium, because there are more calicum channels. This is
          true in other animals as well. Additionally, rather than using four
          state variables, this model only uses two.
        </>
      }
      model={<MorrisLecar />}
    />
  </div>
);

export default NeuronModels;

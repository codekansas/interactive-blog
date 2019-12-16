import React from 'react';

/* --------------
 * Post Renderers
 * -------------- */
import ComplexVariables from 'posts/renderers/ComplexVariables.react';
import NeuronModels from 'posts/renderers/NeuronModels.react';
// import Torchscript from 'posts/renderers/Torchscript.react';

export interface PostInfo {
  title: string;
  blurb: React.Node;
  renderer: React.Node;
}

const PostMap: {
  [string]: PostInfo
} = new Map([
  [
    'complex_variables',
    {
      title: 'Visualizing Complex 🔬 Variables',
      blurb: (
        <span>
          A visualization of the mathematics behind complex variables, which
          form the backbone of quantum mechanics and quantum computing.
        </span>
      ),
      renderer: ComplexVariables,
    },
  ],
  // [
  //   'torchscript', {
  //     title: 'Torchscript 🔥 verses Caffe2 ☕',
  //     blurb: (
  //       <span>
  //         Facebook is migrating a lot of our machine learning inference infrastructure
  //         over to Torchscript, so I figured I should write an informational blog post
  //         about the technical internals of each, as I understand them.
  //       </span>
  //     ),
  //     renderer: Torchscript,
  //   },
  // ],
  [
    'neuron_models',
    {
      title: 'Neuron 🧠 Models',
      blurb: (
        <span>
          An investigation of some different kinds of biological neuron models,
          from the neuroscience world rather than the computer science world
        </span>
      ),
      renderer: NeuronModels,
    },
  ],
]);

export default PostMap;

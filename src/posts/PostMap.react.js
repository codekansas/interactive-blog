import ComplexVariables from "posts/renderers/ComplexVariables.react";
import EscapeGame from "posts/renderers/EscapeGame.react";
import NeuronModels from "posts/renderers/NeuronModels.react";
import React from "react";

export interface PostInfo {
  title: string;
  blurb: React.Node;
  renderer: React.Node;
}

const PostMap: {
  [string]: PostInfo,
} = new Map([
  [
    "escape_game",
    {
      title: "Virtual Escape 🏃 Room",
      blurb: (
        <span>
          An escape room Christmas and birthday present for my beautiful fiancée{" "}
          <a href="https://www.youtube.com/watch?v=8IJzYAda1wA">Chi.</a>
        </span>
      ),
      renderer: EscapeGame,
    },
  ],
  [
    "complex_variables",
    {
      title: "Visualizing Complex 🔬 Variables",
      blurb: (
        <span>
          A visualization of the mathematics behind complex variables, which
          form the backbone of quantum mechanics and quantum computing.
        </span>
      ),
      renderer: ComplexVariables,
    },
  ],
  [
    "neuron_models",
    {
      title: "Neuron 🧠 Models",
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

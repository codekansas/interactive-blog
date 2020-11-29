import React, { FunctionalComponent } from "react";
import Fireworks from "../../modules/Fireworks.react";

const GardenRoom: FunctionalComponent = (props: Props) => {
  return (
    <div>
      <p>Congratulations! You escaped it to the garden!</p>
      <Fireworks />
      <p>Thanks for playing!</p>
    </div>
  );
};

export default GardenRoom;

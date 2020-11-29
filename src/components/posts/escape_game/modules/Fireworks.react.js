import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent } from "react";

const Fireworks: FunctionalComponent = (): React.Node => {
  return (
    <div class="pyro" style={{ height: "15em" }}>
      <div class="before"></div>
      <div class="after"></div>
    </div>
  );
};

export default Fireworks;

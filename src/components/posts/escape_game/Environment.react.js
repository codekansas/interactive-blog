import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent, useState } from "react";
import ClueRenderer from "./clues/ClueRenderer.react";
import RoomRenderer from "./rooms/RoomRenderer.react";

// Defaults for debugging.

const MAP_DEFAULTS = [
  // ["study-room-painting-is-crooked", true],
  // ["book-clue", true],
  // ["leaflet-clue", true],
  // ["phone-clue", true],
  // ["phone-is-unlocked", true],
  // ["flashlight-clue", true],
];

const Environment: FunctionalComponent = () => {
  const [flags, setFlags] = useState(new Map(MAP_DEFAULTS));
  const addFlag = (k: string, v: any): void => {
    setFlags(new Map(flags.set(k, v)));
  };

  return (
    <div className="environment">
      <RoomRenderer flags={flags} addFlag={addFlag} />
      <ClueRenderer flags={flags} addFlag={addFlag} />
    </div>
  );
};

export default Environment;

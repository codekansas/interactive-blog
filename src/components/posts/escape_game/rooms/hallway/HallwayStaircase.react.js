import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const HallwayStaircase: FunctionalComponent = (props: Props) => {
  const { flags, addFlag, setRoom } = props;
  const [matches, setMatches] = useState(0);
  const [prev, setPrev] = useState(null);
  const pattern = [true, true, false, true, false, false];

  const hallway = (
    <Button variant="link" onClick={() => setRoom("hallway-room")}>
      hallway
    </Button>
  );

  const doAction = (action: boolean): void => {
    if (pattern[matches] !== action) {
      setMatches(0);
      setPrev(null);
    } else {
      setPrev(action ? "up" : "down");
      if (matches + 1 < pattern.length) {
        setMatches(matches + 1);
      } else {
        addFlag("hallway-staircase-passed");
      }
    }
  };

  const up = (
    <Button
      variant="link"
      onClick={() => {
        doAction(true);
      }}
    >
      up
    </Button>
  );
  const down = (
    <Button
      variant="link"
      onClick={() => {
        doAction(false);
      }}
    >
      down
    </Button>
  );

  if (flags.has("hallway-staircase-passed")) {
    const basement = (
      <Button variant="link" onClick={() => setRoom("basement-room")}>
        basement
      </Button>
    );
    return (
      <div>
        You can take the staircase to the {basement}, or back to the {hallway}.
      </div>
    );
  } else {
    return (
      <div>
        {prev === null
          ? "You're on the staircase."
          : `You go ${prev} the staircase.`}{" "}
        You can go {up} or {down}, or go back to the {hallway}.
      </div>
    );
  }
};

export default HallwayStaircase;

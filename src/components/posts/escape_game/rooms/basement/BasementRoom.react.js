import React, { FunctionalComponent } from "react";
import { Button } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const BasementRoom: FunctionalComponent = (props: Props) => {
  const { flags, addFlag, setRoom } = props;
  const staircase = (
    <Button variant="link" onClick={() => setRoom("hallway-staircase")}>
      staircase
    </Button>
  );
  const flashlight = (
    <Button variant="link" onClick={() => addFlag("flashlight-clue")}>
      flashlight
    </Button>
  );
  return (
    <div>
      <p>
        {" "}
        You're in the basement. I haven't finished this part. Maybe you can just
        go back to the {staircase}.
      </p>
      {flags.has("flashlight-clue") ? null : (
        <p>There's a {flashlight} lying on the floor.</p>
      )}
    </div>
  );
};

export default BasementRoom;

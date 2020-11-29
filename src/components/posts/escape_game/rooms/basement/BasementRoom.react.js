import React, { FunctionalComponent } from "react";
import { Button } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const BasementRoom: FunctionalComponent = (props: Props) => {
  const { setRoom } = props;
  const staircase = (
    <Button variant="link" onClick={() => setRoom("hallway-staircase")}>
      staircase
    </Button>
  );
  return (
    <div>
      You're in the basement. I haven't finished this part. Maybe you can just
      go back to the {staircase}.
    </div>
  );
};

export default BasementRoom;

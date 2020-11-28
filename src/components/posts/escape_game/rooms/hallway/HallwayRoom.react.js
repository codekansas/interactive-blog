import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent } from "react";
import { Button } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const HallwayRoom: FunctionalComponent = (props: Props) => {
  const { setRoom } = props;
  const study = (
    <Button variant="link" onClick={() => setRoom("study-room")}>
      study
    </Button>
  );
  return (
    <div>
      You're in the hallway. I haven't finished this part yet. You can go back
      to the {study}.
    </div>
  );
};

export default HallwayRoom;

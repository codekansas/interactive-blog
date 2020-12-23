import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent } from "react";
import { Button } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const renderDoorText = (props: Props): React.Node => {
  const { flags, setRoom } = props;
  const rest = (
    <Button variant="link" onClick={() => setRoom("study-room")}>
      rest
    </Button>
  );
  if (flags.has("study-door-is-open")) {
    const hallway = (
      <Button variant="link" onClick={() => setRoom("hallway-room")}>
        hallway
      </Button>
    );
    return (
      <p>
        The door to the study is open. You can walk out into the {hallway}, or
        go back and look at the {rest} of the room.
      </p>
    );
  } else {
    return (
      <p>
        The door to the study is locked up tight. Maybe you should go explore
        the {rest} of the room.
      </p>
    );
  }
};

const StudyRoomDoor: FunctionalComponent = (props: Props) => {
  return <div>{renderDoorText(props)}</div>;
};

export default StudyRoomDoor;

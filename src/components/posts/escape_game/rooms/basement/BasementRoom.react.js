import React, { FunctionalComponent } from "react";
import { Button, ListGroup } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  setRoom: (k: string) => void;
}

const BasementRoom: FunctionalComponent = (props: Props) => {
  const { flags, setRoom } = props;
  const staircase = (
    <Button variant="link" onClick={() => setRoom("hallway-staircase")}>
      staircase
    </Button>
  );
  const garden = (
    <Button variant="link" onClick={() => setRoom("garden-room")}>
      garden
    </Button>
  );
  const flashlight_status = flags.has("flashlight-status")
    ? flags.get("flashlight-status")
    : false;

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>You're in the basement.</ListGroup.Item>
        {flashlight_status ? (
          <ListGroup.Item>
            The flashlight illuminates the room. You see a door on the opposite
            side of the room which looks like it leads to the {garden}.
          </ListGroup.Item>
        ) : (
          <ListGroup.Item>You can't see much.</ListGroup.Item>
        )}
        <ListGroup.Item>You can go back to the {staircase}.</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default BasementRoom;

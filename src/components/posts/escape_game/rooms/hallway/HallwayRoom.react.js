import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Clock from "../../modules/Clock.react";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const HallwayRoom: FunctionalComponent = (props: Props) => {
  const { flags, setRoom } = props;
  const study = (
    <Button variant="link" onClick={() => setRoom("study-room")}>
      study
    </Button>
  );
  const left = (
    <Button variant="link" onClick={() => setRoom("hallway-staircase")}>
      left
    </Button>
  );
  const right = (
    <Button variant="link" onClick={() => setRoom("hallway-elevator")}>
      right
    </Button>
  );

  const time = flags.has("current-time")
    ? flags.get("current-time")
    : new Date("Aug 9, 1995 11:35:20");
  const clock = (
    <Clock
      hour={time.getHours()}
      minute={time.getMinutes()}
      second={time.getSeconds()}
    />
  );

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          You're in the hallway. On your {left} is a spiral staircase. On your{" "}
          {right} is an elevator.
        </ListGroup.Item>
        <ListGroup.Item>You can go back to the {study}.</ListGroup.Item>
        <ListGroup.Item>
          A clock on the wall shows the current time. {clock}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default HallwayRoom;

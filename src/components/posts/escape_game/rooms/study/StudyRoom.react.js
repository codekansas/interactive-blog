import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent } from "react";
import { Button, ListGroup } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const renderMain = (props: Props): React.Node => {
  const { addFlag } = props;

  return (
    <ListGroup.Item>
      You're standing in a study. There's some{" "}
      <Button variant="link" onClick={() => addFlag("leaflet-clue")}>
        leaflets
      </Button>{" "}
      on the table, along with a musty old{" "}
      <Button variant="link" onClick={() => addFlag("book-clue")}>
        book
      </Button>
      , and someone's{" "}
      <Button variant="link" onClick={() => addFlag("phone-clue")}>
        phone
      </Button>
      . You're head hurts - must have been a late night last night, but you
      can't remember how you got here.
    </ListGroup.Item>
  );
};

const renderDoor = (props: Props): React.Node => {
  const { flags, setRoom } = props;

  const door = (
    <Button variant="link" onClick={() => setRoom("study-room-door")}>
      door
    </Button>
  );
  if (flags.has("study-door-is-open")) {
    return (
      <ListGroup.Item>
        The {door} out of the study is open. Maybe you should walk over to it?
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        There's a {door} on the opposite side of the room. It looks like it's
        locked up tight.
      </ListGroup.Item>
    );
  }
};

const renderPainting = (props: Props): React.Node => {
  const { flags, addFlag, setRoom } = props;

  const painting = (
    <Button
      variant="link"
      onClick={() => {
        setRoom("study-room-painting");
      }}
    >
      painting
    </Button>
  );
  if (flags.has("study-room-painting-is-crooked")) {
    return (
      <ListGroup.Item>
        The {painting} hanging next to the door is crooked from where you moved
        it aside earlier. On the plus side, it's not as dusty anymore.
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        Hanging next to the door is a {painting} of a boat being tossed by a
        storm. The painting looks very old, and it's a bit dusty.
      </ListGroup.Item>
    );
  }
};

const StudyRoom: FunctionalComponent = (props: Props) => {
  return (
    <div>
      <ListGroup>
        {renderMain(props)}
        {renderDoor(props)}
        {renderPainting(props)}
      </ListGroup>
    </div>
  );
};

export default StudyRoom;

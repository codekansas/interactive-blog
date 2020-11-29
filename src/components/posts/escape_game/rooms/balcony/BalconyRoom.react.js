import React, { FunctionalComponent } from "react";
import { Button, ListGroup } from "react-bootstrap";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const BalconyRoom: FunctionalComponent = (props: Props) => {
  const { flags, addFlag, setRoom } = props;
  const elevator = (
    <Button variant="link" onClick={() => setRoom("hallway-elevator")}>
      elevator
    </Button>
  );

  const getLeafletText = (): React.Node => {
    if (flags.has("got-iron-fitness-leaflet")) {
      return (
        <ListGroup.Item>
          You picked up a leaflet. It seems to be a flier for Iron Fitness.
        </ListGroup.Item>
      );
    } else {
      const leaflet = (
        <Button
          variant="link"
          onClick={() => addFlag("got-iron-fitness-leaflet")}
        >
          leaflet
        </Button>
      );
      return (
        <ListGroup.Item>
          You see a {leaflet} fluttering in the wind.
        </ListGroup.Item>
      );
    }
  };

  const flashlight = (
    <Button variant="link" onClick={() => addFlag("flashlight-clue")}>
      flashlight
    </Button>
  );

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          You're on the balcony. It's a nice view. There's some birds chirping
          nearby.
        </ListGroup.Item>
        {getLeafletText()}
        {flags.has("flashlight-clue") ? null : (
          <ListGroup.Item>
            There's a {flashlight} lying on the floor.
          </ListGroup.Item>
        )}
        <ListGroup.Item>You can go back to the {elevator}.</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default BalconyRoom;

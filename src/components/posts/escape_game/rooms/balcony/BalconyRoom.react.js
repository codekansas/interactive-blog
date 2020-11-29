import React, { FunctionalComponent } from "react";
import { Button } from "react-bootstrap";

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
        <p>You picked up a leaflet. It seems to be a flier for Iron Fitness.</p>
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
      return <p>You see a {leaflet} fluttering in the wind.</p>;
    }
  };

  return (
    <div>
      <p>
        You're on the balcony. It's a nice view. There's some birds chirping
        nearby.
      </p>
      {getLeafletText()}
      <p>You can go back to the {elevator}.</p>
    </div>
  );
};

export default BalconyRoom;

import React, { FunctionalComponent } from "react";
import { Button } from "react-bootstrap";
import Keypad from "../../modules/Keypad.react";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const HallwayElevator: FunctionalComponent = (props: Props) => {
  const { flags, addFlag, setRoom } = props;
  const hallway = (
    <Button variant="link" onClick={() => setRoom("hallway-room")}>
      hallway
    </Button>
  );
  if (!flags.has("current-time-reached-max-time")) {
    return (
      <div>
        You stare at the elevator. It's quote old. The buttons seem to be out of
        order. A small sign on the door says, "On break until at 11:45". You can
        stand around here, or go back to the {hallway}
      </div>
    );
  }
  if (!flags.has("hallway-elevator-passed-code")) {
    const time = flags.has("current-time")
      ? flags.get("current-time")
      : new Date("Aug 9, 1995 11:35:20");

    const minutes = time.getMinutes() + 3;

    return (
      <div>
        {flags.has("hallway-elevator-tried-code") ? (
          <p>
            Looks like that code didn't work. You may need to go back to the{" "}
            {hallway} and search for clues.
          </p>
        ) : (
          <p>
            The elevator doors are open. There's only one other floor, but it
            looks like you'll need to enter a code if you want to go to that
            floor. Otherwise, you can go back to the {hallway}.
          </p>
        )}
        <Keypad
          correct={[1, 1, Math.floor(minutes / 10), minutes % 10]}
          onSuccess={() => {
            addFlag("hallway-elevator-passed-code");
          }}
          onFailure={() => {
            addFlag("hallway-elevator-tried-code");
          }}
        />
      </div>
    );
  }
  const balcony = (
    <Button variant="link" onClick={() => setRoom("balcony-room")}>
      balcony
    </Button>
  );
  return (
    <div>
      You can take the elevator to the {balcony}. Otherwise, you can go back to
      the {hallway}.
    </div>
  );
};

export default HallwayElevator;

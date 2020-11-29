import React, { FunctionalComponent } from "react";
import { Button } from "react-bootstrap";
import Keypad from "../../modules/Keypad.react";

interface Props {
  flags: Map<string, any>;
  addFlag: (k: string, v: any) => void;
  setRoom: (k: string) => void;
}

const getCodeText = (props: Props): React.Node => {
  const { flags, setRoom } = props;
  if (flags.has("study-door-is-open")) {
    const rest = (
      <Button variant="link" onClick={() => setRoom("study-room")}>
        rest
      </Button>
    );

    return (
      <p>
        You're password worked! You should go check the {rest} of the room to
        see what it did.
      </p>
    );
  } else if (flags.has("study-room-painting-tried-code")) {
    const rest = (
      <Button variant="link" onClick={() => setRoom("study-room")}>
        rest
      </Button>
    );

    return (
      <p>
        It seems like the code you entered didn't work. Maybe you can go explore
        the {rest} of the room.
      </p>
    );
  } else {
    return (
      <p>
        This painting is a little bit crooked. Behind the painting you notice a
        panel where you can input numbers.
      </p>
    );
  }
};

const renderPaintingText = (props: Props): React.Node => {
  const { flags, addFlag, setRoom } = props;

  if (flags.has("study-room-painting-is-crooked")) {
    return (
      <div>
        {getCodeText(props)}
        <Keypad
          correct={[1, 4, 4, 1]}
          onSuccess={() => {
            addFlag("study-door-is-open");
          }}
          onFailure={() => {
            addFlag("study-room-painting-tried-code");
          }}
        />
      </div>
    );
  } else if (flags.has("study-room-painting-clue-found")) {
    const move = (
      <Button
        variant="link"
        onClick={() => addFlag("study-room-painting-is-crooked", true)}
      >
        move
      </Button>
    );

    return (
      <p>
        You look deeply at the painting for several minutes. The colors are
        fascinating - it looks like it might have been color-by-number. You
        remember your conversation with Chloe. Maybe you can try to {move} the
        painting aside to see if there's anything behind it.
      </p>
    );
  } else {
    const rest = (
      <Button variant="link" onClick={() => setRoom("study-room")}>
        rest
      </Button>
    );

    return (
      <p>
        You look deeply at the painting for several minutes. The colors are
        fascinating - it looks like it might have been color-by-number. Maybe
        you should go explore the {rest} of the room.
      </p>
    );
  }
};

const StudyRoomPainting: FunctionalComponent = (props: Props) => {
  return <div>{renderPaintingText(props)}</div>;
};

export default StudyRoomPainting;

import React, { FunctionalComponent, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Clock from "../modules/Clock.react";
import Keypad from "../modules/Keypad.react";
import PhoneChat from "../modules/PhoneChat.react";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

interface State {
  screen: ?string;
  setScreen: (s: ?string) => void;
  conversation: ?string;
  setConversation: (s: ?string) => void;
}

const renderLockscreen = (props: Props): React.Node => {
  const { flags, addFlag } = props;
  const tried_passwords = flags.has("phone-tried-passwords")
    ? flags.get("phone-tried-passwords")
    : [];
  const hint =
    tried_passwords.length < 3 ? null : <b>Hint: Password is 1234</b>;
  return (
    <div>
      <p>
        The phone is locked.{" "}
        {tried_passwords.length > 0
          ? "You've tried the passwords: " + tried_passwords.join(", ")
          : "You haven't tried a password yet."}{" "}
        {hint}
      </p>
      <Keypad
        correct={[1, 2, 3, 4]}
        onSuccess={() => {
          addFlag("phone-is-unlocked");
        }}
        onFailure={(password: Array<number>) => {
          tried_passwords.push(password.join(""));
          addFlag("phone-tried-passwords", tried_passwords);
        }}
      />
    </div>
  );
};

const renderConversation = (props: Props, state: State): React.Node => {
  const { conversation } = state;
  switch (conversation) {
    case "ben":
      return (
        <PhoneChat
          name="Ben"
          messages={[
            { text: "Yo, you free later?", mine: false },
            { text: "Nope, sorry", mine: true },
            { text: "Studying all night", mine: true },
            { text: "You have an exam or something?", mine: false },
            { text: "Yep, big test tomorrow", mine: true },
            { text: "Good luck! 😊", mine: false },
          ]}
        />
      );
    case "chloe":
      return (
        <PhoneChat
          name="Chloe"
          messages={[
            { text: "Hey, what's up with the new key codes?", mine: true },
            { text: "LOL i don't know, it's so weird", mine: false },
            { text: "i already forgot mine twice", mine: false },
            {
              text: "Yea, mine's just some random thing I saw on a flyer",
              mine: true,
            },
            {
              text: "I also put a painting over the keypad to cover it up",
              mine: true,
            },
          ]}
        />
      );
    case "estee":
      return (
        <PhoneChat
          name="Estee"
          messages={[
            { text: "Hiii!", mine: true },
            { text: "What's the elevator code again?", mine: true },
            { text: "OMG it's so annoying", mine: false },
            {
              text: "It's whatever the current time is, plus three minutes",
              mine: false,
            },
            { text: "Thanks!", mine: true },
          ]}
        />
      );
    default:
      return <div>Conversation not found: {conversation}</div>;
  }
};

const renderAllConversations = (props: Props, state: State): React.Node => {
  const { setScreen, conversation, setConversation } = state;
  const { addFlag } = props;
  if (conversation !== null) {
    return (
      <div>
        <Button
          onClick={() => setConversation(null)}
          style={{ marginBottom: "1em" }}
        >
          Back
        </Button>
        {renderConversation(props, state)}
      </div>
    );
  }

  return (
    <ButtonGroup vertical>
      <Button onClick={() => setConversation("ben")}>Ben</Button>
      <Button
        onClick={() => {
          setConversation("chloe");
          addFlag("study-room-painting-clue-found");
        }}
      >
        Chloe
      </Button>
      <Button onClick={() => setConversation("estee")}>Estee</Button>
      <Button onClick={() => setScreen(null)}>Back</Button>
    </ButtonGroup>
  );
};

const renderClock = (props: Props, state: State): React.Node => {
  const { setScreen } = state;
  const { flags, addFlag } = props;

  const maxDate = new Date("Aug 9, 1995 11:45:20");
  const noIncDate = new Date("Aug 9, 1995 11:55:20")
  const time = flags.has("current-time")
    ? flags.get("current-time")
    : new Date("Aug 9, 1995 11:35:20");

  return (
    <div>
      <Button onClick={() => setScreen(null)}>Back</Button>
      <Clock
        hour={time.getHours()}
        minute={time.getMinutes()}
        second={time.getSeconds()}
        onClick={() => {
          if (time.getMinutes() < noIncDate.getMinutes()) {
            const newTime = new Date(time.setMinutes(time.getMinutes() + 1));
            addFlag("current-time", newTime);
            if (newTime.getMinutes() === maxDate.getMinutes()) {
              addFlag("current-time-reached-max-time");
            }
          }
        }}
      />
    </div>
  );
};

const renderHome = (props: Props, state: State): React.Node => {
  const { setScreen } = state;
  return (
    <ButtonGroup vertical>
      <Button onClick={() => setScreen("conversations")}>Messages</Button>
      <Button onClick={() => setScreen("clock")}>Clock</Button>
    </ButtonGroup>
  );
};

const renderPhone = (props: Props, state: State): React.Node => {
  const { flags } = props;
  const { screen } = state;
  if (!flags.has("phone-is-unlocked")) {
    return renderLockscreen(props);
  }
  switch (screen) {
    case "conversations":
      return renderAllConversations(props, state);
    case "clock":
      return renderClock(props, state);
    default:
      return renderHome(props, state);
  }
};

const PhoneClue: FunctionalComponent = (props: Props) => {
  const [screen, setScreen] = useState(null);
  const [conversation, setConversation] = useState(null);

  const state: State = {
    screen,
    setScreen,
    conversation,
    setConversation,
  };

  return (
    <div style={{ margin: "1em", width: "15em" }}>
      {renderPhone(props, state)}
    </div>
  );
};

export default PhoneClue;

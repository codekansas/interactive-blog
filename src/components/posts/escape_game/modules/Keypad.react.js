import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface Props {
  correct: Array<number>;
  onSuccess: () => void;
  onFailure: (n: Array<number>) => void;
  maxLength: number;
}

const isCorrect = (entered: Array<number>, correct: Array<number>): boolean => {
  if (entered.length !== correct.length) {
    return false;
  }
  for (let i = 0; i < correct.length; i++) {
    if (correct[i] !== entered[i]) {
      return false;
    }
  }
  return true;
};

const Keypad: FunctionalComponent = (props: Props) => {
  const { correct, onSuccess, onFailure, maxLength } = props;
  const [entered, setEntered] = useState([]);

  const addNumber = (n: number) => {
    if (entered.length < maxLength) {
      setEntered(entered.concat(n));
    }
  };

  const deleteNumber = () => {
    if (entered.length > 0) {
      setEntered(entered.slice(0, -1));
    }
  };

  const submitAnswer = () => {
    if (isCorrect(entered, correct)) {
      onSuccess();
    } else {
      onFailure(entered);
    }
    setEntered([]);
  };

  const numbers = [...Array(10).keys()].map((k) => (
    <Button key={k} onClick={() => addNumber(k)}>
      {k}
    </Button>
  ));

  const delete_key = (
    <Button
      key="delete"
      disabled={entered.length === 0}
      onClick={() => deleteNumber()}
    >
      Delete
    </Button>
  );

  const submit_key = (
    <Button
      type="submit"
      key="submit"
      disabled={entered.length === 0}
      onClick={() => submitAnswer()}
    >
      Submit
    </Button>
  );

  return (
    <ButtonGroup vertical style={{ margin: "1em" }}>
      <ButtonGroup key="a">
        <Button disabled variant="light">
          {entered.length === 0 ? "Enter Code" : entered.join("")}
        </Button>
      </ButtonGroup>
      <ButtonGroup key="b">{numbers.slice(1, 4)}</ButtonGroup>
      <ButtonGroup key="c">{numbers.slice(4, 7)}</ButtonGroup>
      <ButtonGroup key="d">{numbers.slice(7, 10)}</ButtonGroup>
      <ButtonGroup key="e">
        {numbers.slice(0, 1)}
        {delete_key}
        {submit_key}
      </ButtonGroup>
    </ButtonGroup>
  );
};

Keypad.defaultProps = {
  maxLength: 10,
};

export default Keypad;

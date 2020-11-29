import React, { FunctionalComponent, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import FlashlightOff from "../images/flashlight-off.svg";
import FlashlightOn from "../images/flashlight-on.svg";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

const FlashlightClue: FunctionalComponent = (props: Props) => {
  const { flags, addFlag } = props;

  const status = flags.has("flashlight-status")
    ? flags.get("flashlight-status")
    : false;
  const switch_btn = (
    <Button
      onClick={() => addFlag("flashlight-status", !status)}
      variant="link"
    >
      switch
    </Button>
  );
  const img = status ? FlashlightOn : FlashlightOff;

  return (
    <div>
      <p>
        It's a flashlight. The flashlight is currently{" "}
        <b>{status ? "on" : "off"}</b>.
      </p>
      <Card style={{ margin: "1em", width: "18em" }}>
        <Card.Img variant="bottom" src={img} />
        <Card.Body>
          <Card.Title>Flashlight</Card.Title>
          <ButtonGroup style={{ marginTop: "1em" }}>
            <Button
              disabled={!status}
              onClick={() => addFlag("flashlight-status", false)}
            >
              Turn Off
            </Button>
            <Button
              disabled={status}
              onClick={() => addFlag("flashlight-status", true)}
            >
              Turn On
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FlashlightClue;

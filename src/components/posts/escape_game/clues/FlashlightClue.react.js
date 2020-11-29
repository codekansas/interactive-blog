import React, { FunctionalComponent, useState } from "react";
import { Button } from "react-bootstrap";

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

  return (
    <div style={{ margin: "1em" }}>
      It's a flashlight. The flashlight is currently <b>{status ? "on" : "off"}</b>.
      You can try pressing the {switch_btn}.
    </div>
  );
};

export default FlashlightClue;

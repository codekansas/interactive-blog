import React, { FunctionalComponent, useState } from "react";
import { Button } from "react-bootstrap";
import BookClue from "./BookClue.react";
import FlashlightClue from "./FlashlightClue.react";
import LeafletClue from "./LeafletClue.react";
import PhoneClue from "./PhoneClue.react";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

const getClue = (
  clues: List,
  viewing: string,
  setViewing: (k: ?string) => void
): React.Node => {
  const clue_list = clues.filter((k) => k.key === viewing);
  if (clue_list.length === 0) return null;
  const clue = clue_list[0];

  return (
    <div style={{ marginBottom: "1em" }}>
      <h3>{clue.name}</h3>
      <div>{clue.renderer}</div>
      <div>
        <Button variant="link" onClick={() => setViewing(null)}>
          Close
        </Button>
      </div>
    </div>
  );
};

const getClueList = (
  clues: List,
  flags: Set<string>,
  setViewing: (k: ?string) => void
): React.Node => {
  const clue_list = clues
    .filter((k) => flags.has(k.key))
    .map((k, i) => (
      <li key={i}>
        <Button variant="link" onClick={() => setViewing(k.key)}>
          {k.name}
        </Button>
      </li>
    ));
  if (clue_list.length === 0) return null;
  return (
    <div>
      <h3>Clues</h3>
      <ul>{clue_list}</ul>
    </div>
  );
};

const ClueRenderer: FunctionalComponent = (props: Props) => {
  const { flags } = props;
  const [viewing, setViewing] = useState(null);

  const clues = [
    {
      key: "book-clue",
      name: "A musty old book",
      renderer: <BookClue {...props} />,
    },
    {
      key: "leaflet-clue",
      name: "Some scattered leaflets",
      renderer: <LeafletClue {...props} />,
    },
    {
      key: "phone-clue",
      name: "Phone",
      renderer: <PhoneClue {...props} />,
    },
    {
      key: "flashlight-clue",
      name: "A dim flashlight",
      renderer: <FlashlightClue {...props} />,
    },
  ];

  const clue_list = getClueList(clues, flags, setViewing);
  if (clue_list === null) return null;

  return (
    <div className="renderer">
      <hr></hr>
      {viewing === null ? null : getClue(clues, viewing, setViewing)}
      {clue_list}
    </div>
  );
};

export default ClueRenderer;

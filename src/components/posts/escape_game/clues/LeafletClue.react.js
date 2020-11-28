import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import EllingtonFarms from "../images/ellington-farms.svg";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

const PAGES = [
  {
    title: "Ellington Farms",
    body: (
      <Card.Text>
        Come on down to Ellington Farms! You'll love our three dogs Spot,
        Ruffles and Nitwit.
      </Card.Text>
    ),
    img: EllingtonFarms,
  },
];

const BookClue: FunctionalComponent = (props: Props) => {
  const [page, setPage] = useState(0);

  const nextPage = (): void => {
    if (page < PAGES.length - 1) {
      setPage(page + 1);
    }
  };

  const prevPage = (): void => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const leaflet = PAGES[page];

  return (
    <div>
      <p>You check out the leaflests.</p>
      <Card style={{ margin: "1em", width: "18em" }}>
        <Card.Img variant="bottom" src={leaflet.img} />
        <Card.Body>
          <Card.Title>{leaflet.title}</Card.Title>
          <Card.Subtitle>
            Leaflet {page + 1} / {PAGES.length}
          </Card.Subtitle>
          {leaflet.body}
          <ButtonGroup style={{ marginTop: "1em" }}>
            <Button onClick={() => prevPage()}>Previous</Button>
            <Button onClick={() => nextPage()}>Next</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookClue;

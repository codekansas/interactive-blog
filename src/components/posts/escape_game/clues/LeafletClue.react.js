import React, { FunctionalComponent, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import EllingtonFarms from "../images/ellington-farms.svg";
import IronFitness from "../images/iron-fitness.svg";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

const BookClue: FunctionalComponent = (props: Props) => {
  const { flags } = props;
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Ellington Farms",
      body: (
        <Card.Text>
          Come on down to Ellington Farms! You'll love our three dogs Spot,
          Ruffles and Nitwit.
        </Card.Text>
      ),
      img: EllingtonFarms,
      hidden: false,
    },
    {
      title: "Iron Fitness",
      body: (
        <Card.Text>
          IRON FITNESS: Get fit like the pros! Jump roping, stair climbing, and
          weight lifting. Special discount for first-timers.
        </Card.Text>
      ),
      img: IronFitness,
      hidden: !flags.has("got-iron-fitness-leaflet"),
    },
  ].filter((p) => !p.hidden);

  const nextPage = (): void => {
    if (page < pages.length - 1) {
      setPage(page + 1);
    }
  };

  const prevPage = (): void => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const leaflet = pages[page];

  return (
    <div>
      <p>
        You rifle through the leaflests. Looks like a lot of them are
        advertisements.
      </p>
      <Card style={{ margin: "1em", width: "18em" }}>
        <Card.Img variant="bottom" src={leaflet.img} />
        <Card.Body>
          <Card.Title>{leaflet.title}</Card.Title>
          <Card.Subtitle>
            Leaflet {page + 1} / {pages.length}
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

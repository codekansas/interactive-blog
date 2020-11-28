import "css/posts/escape_room/EscapeRoom.scss";
import React, { FunctionalComponent, useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";

interface Props {
  flags: Set<string>;
  addFlag: (k: string) => void;
}

const PAGES = [
  <span>
    Once upon a time, in a small village very far away, there lived a cute
    little pig and a big, boring dog.
  </span>,
  <span>
    The pig was always full of energy, while the dog liked to sleep until noon
    and never seemed to have any patience for the pig's hilarious jokes or
    clever insights into the workings of the world.
  </span>,
  <span>
    One day, while the pig was wandering through the forest, she came across a
    mean-looking wolf.
  </span>,
  <span>
    The wolf growled at her. The pig turned around to run, but the wold pounced
    on her and pinned her to the ground.
  </span>,
  <span>
    Just as the wolf was about to bite her neck, the dog came leaping out of a
    nearby bush and knocked the wolf off of the pig.
  </span>,
  <span>The wolf, seeing himself outnumbered, turned and slank away.</span>,
  <span>
    The pig was very grateful. She asked the dog, "Dog, your normally so lazy.
    How were you able to come and save me in time?"
  </span>,
  <span>
    The dog said, "Pig, you're the most important animal in the world to me.
    Because whenever we're alone, we can only count on ourselves. But whenever
    we're together, it's like there's twice as many of us."
  </span>,
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

  return (
    <div>
      <p>You open the musty old book. Here's what it says.</p>
      <Card style={{ margin: "1em", width: "18em" }}>
        <Card.Body>
          <Card.Title>The Story of the Pig and the Dog</Card.Title>
          <Card.Subtitle>
            Page {page + 1} / {PAGES.length}
          </Card.Subtitle>
          <ButtonGroup style={{ marginBottom: "1em", marginTop: "1em" }}>
            <Button onClick={() => prevPage()}>Previous</Button>
            <Button onClick={() => nextPage()}>Next</Button>
          </ButtonGroup>
          <Card.Text>{PAGES[page]}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookClue;

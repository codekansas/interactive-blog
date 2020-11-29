import React, { FunctionalComponent } from "react";
import "css/pages/Post.scss";
import "css/posts/escape_room/EscapeRoom.scss";
import Environment from "components/posts/escape_game/Environment.react";

const EscapeGame: FunctionalComponent = () => (
  <div className="post-body">
    <h3>Escape from Oxford</h3>
    <div>
      You've woken up in a mysterious room, with no recollection of the night
      before. Can you figure out what happened and how to get back home?
    </div>
    <Environment />
  </div>
);

export default EscapeGame;

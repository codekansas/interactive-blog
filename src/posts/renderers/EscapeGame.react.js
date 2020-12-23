import React, { FunctionalComponent } from "react";
import "css/pages/Post.scss";
import "css/posts/escape_room/EscapeRoom.scss";
import Environment from "components/posts/escape_game/Environment.react";

const EscapeGame: FunctionalComponent = () => (
  <div className="post-body">
    <h3>Virtual Escape Room</h3>
    <div>Welcome to my virtual escape room! This works best on Chrome.</div>
    <Environment />
  </div>
);

export default EscapeGame;

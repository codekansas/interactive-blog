import React, { FunctionalComponent } from "react";
import "css/pages/Post.scss";
import "css/posts/escape_room/EscapeRoom.scss";
import Environment from "components/posts/escape_game/Environment.react";

const EscapeGame: FunctionalComponent = () => (
  <div>
    <div className="post-body">
      <h3>Escape from Oxford!</h3>
      <div>
        Doctor Le, help! A terrible plague has broken out. You've been trapped
        in a small apartment with your dashing android fiancee, Benbot. Do you
        have what it takes to escape from Oxford with your health and grades
        still intact?
      </div>
      <Environment />
    </div>
  </div>
);

export default EscapeGame;

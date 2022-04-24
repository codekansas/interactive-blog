import React, { FunctionalComponent } from "react";

const About: FunctionalComponent = () => (
  <div className="emphasis all">
    <div className="post-body">
      <h1 className="padded bottom">
        Hi!{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>{" "}
        My name is Ben.
      </h1>
      <h4 className="padded bottom contents">
        These are some interactive posts that didn't fit in very well with my
        main blog over <a href="https://ben.bolte.cc/">here</a>.
      </h4>
    </div>
  </div>
);

export default About;

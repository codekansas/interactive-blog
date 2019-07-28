import React, { FunctionalComponent } from 'react';
import 'css/pages/About.scss';

const About: FunctionalComponent = () => (
  <div className="emphasis all">
    <h1 className="padded bottom">
      Hi!{' '}
      <span role="img" aria-label="waving hand">👋</span>
    </h1>
    <h2 className="padded bottom">
      My name is Ben.
    </h2>
    <h4 className="padded bottom contents">
      I'm a software engineer at Facebook, where I work on natural language
      processing.
    </h4>
    <h4 className="padded bottom contents">
      I like trying to explain things in fun and informative ways. I used to fairly
      active on{' '}
      <a href="https://github.com/codekansas">Github</a>
      . If you're interested in connecting, shoot me an{' '}
      <a href="mailto:ben@bolte.cc">email</a>.
    </h4>
    <h4 className="padded bottom contents">
      Besides programming, I like playing soccer and reading books. I'm currently
      trying to get better at{' '}
      <a href="https://www.chess.com/member/codekansas">chess</a>
      , but it's slow going.
    </h4>
  </div>
);

export default About;

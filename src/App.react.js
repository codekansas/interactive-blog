import React, { FunctionalComponent } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { HashRouter, Route } from 'react-router-dom';

import About from 'pages/About.react';
import PostRouter from 'posts/PostRouter.react';

import 'css/App.scss';

const App: FunctionalComponent = () => (
  <div className="App">
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#posts">Posts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
    <HashRouter>
      <Route exact path="/" component={About} />
      <Route
        path="/posts"
        component={({
          match: {
            url,
          },
        }) => (
          <HashRouter>
            <Route exact path={`${url}`} component={PostRouter} />
            <Route
              path={`${url}/:post`}
              component={({
                match: {
                  params: {
                    post,
                  },
                },
              }) => <PostRouter post={post} />}
            />
          </HashRouter>
        )}
      />
    </HashRouter>
  </div>
);

export default App;

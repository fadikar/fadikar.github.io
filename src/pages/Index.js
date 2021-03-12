import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={"Arindam's personal website"}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">My personal webpage</Link></h2>
          <p>
            Adapted from <a href="https://github.com/mldangelo/personal-site">mldangelo</a>.
          </p>
        </div>
      </header>
      <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
        or you can check out my {' '}
        <Link to="/resume">resume</Link>, {' '}
        <Link to="/projects">projects</Link>, {' '}
        view <Link to="/stats">site statistics</Link>, {' '}
        or <Link to="/contact">contact</Link> me.
      </p>
      <p> Feel free to shoot me a message at <a href="mailto:afadikar@anl.gov">afadikar@anl.gov</a>.</p>
      <p><a href="https://scholar.google.com/citations?user=LGfsuRQAAAAJ&hl=en&oi=ao">Google scholar</a></p>
      {/* <div><img src="/public/images/cover.jpg" alt="me"></div> */}
    </article>
  </Main>
);

export default Index;

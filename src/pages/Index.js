import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const Index = () => (
  <Main
    description={"Arindam Fadikar's personal website"}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">My personal webpage</Link></h2>
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
      <p><img src={`${PUBLIC_URL}/images/cover.jpg`} alt="cover" width="900" height="617" /></p>
      {/* <div><img src="/public/images/cover.jpg" alt="cover"></div> */}
    </article>
  </Main>
);

export default Index;

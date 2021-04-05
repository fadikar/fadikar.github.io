import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/potrait.jpg`} alt="" />
      </Link>
      <header>
        <h2>Arindam Fadikar</h2>
        <p><a href="mailto:afadikar@anl.gov">afadikar@anl.gov</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Arindam, a statistician by training and an endurance sports enthusiast living
        in the Chicago area.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Arindam Fadikar <Link to="/">fadikar.github.io</Link>.</p>
      <p className="copyright">Adapted from <Link to="/">mldangelo.com</Link></p>
    </section>
  </section>
);

export default SideBar;

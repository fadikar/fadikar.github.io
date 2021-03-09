import React from 'react';
import { Link } from 'react-router-dom';

const References = () => (
  <div className="references">
    <div className="link-to" id="references" />
    <div className="title">
      <Link to="/contact">
        <h3>Please email me for a complete CV.</h3>
      </Link>
    </div>
  </div>
);

export default References;

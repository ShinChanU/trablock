import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <ul>
      <li>
        <Link to="/">main</Link>
      </li>
      <li>
        <Link to="/signup">signup</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
    </ul>
  );
};

export default Header;
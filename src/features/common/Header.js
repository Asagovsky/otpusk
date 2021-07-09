import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { email, loggedIn } = useSelector(state => state.auth);

  return <div className="hd">{loggedIn && <span>{email}</span>}</div>;
}

export default Header;

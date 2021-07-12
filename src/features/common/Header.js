import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../login/loginSlice';
import { toInitial } from '../tickets/ticketsSlice';

function Header() {
  const { email, loggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logoutApp = () => {
    dispatch(toInitial());
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div className="container">
      <header>
        {loggedIn && (
          <>
            <span className="email">{email}</span>
            <button
              className="logout"
              type="button"
              onClick={() => {
                logoutApp();
              }}
            >
              logout
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default Header;

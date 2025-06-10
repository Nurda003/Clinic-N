import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import prof from '../img/prof.png';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const { auth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex justify-center items-center ">
      <nav className="bg-navbg rounded-xl w-full border-gray-200 relative">
        <div className="max-w-screen-xl flex items-center justify-end mx-auto p-7 my-auto">
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            {auth?.token ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
                  id="user-menu-button"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="w-14 h-14 rounded-full bg-white" src={prof} alt="User Profile" />
                </button>

                <div
                  className={`z-50 mt-14 text-base bg-navbg list-none rounded-lg shadow-lg ${dropdownOpen ? 'block' : 'hidden'} absolute right-0 top-1 w-60`}
                  id="user-dropdown"
                  onBlur={() => setDropdownOpen(false)}
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 ">
                      Signed in as {auth.user?.username}
                    </span>
                    <span className="block text-sm text-gray-500 truncate ">
                      Email: {auth.user?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    {auth.user?.role === 'medicalStoreWorker' && (
                      <li>
                        <Link
                          to="/Dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {auth.user?.role === 'user' && (
                      <li>
                        <Link
                          to="/Favorites"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Favorites
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => dispatch(logout())}
                        className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate('/Login')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                aria-label="Sign In"
              >
                Sign In
              </button>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mr-33"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 w-full border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-base ">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Clinics"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  Clinics
                </Link>
              </li>
              {auth?.token && auth?.user?.role === 'user' && (
                <li>
                  <Link
                    to="/Journal"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                  >
                    Journal
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/ForDentals"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  For Dentals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

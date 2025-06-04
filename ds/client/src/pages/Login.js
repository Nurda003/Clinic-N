import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Login() {
  // Initial State for Login form
  const initialState = { email: '', password: '' };
  // Hook for keeping track of user data
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  // Redux dispatch hook
  const dispatch = useDispatch();
  // Hook to navigate in react-router
  const navigate = useNavigate();
  // Access the authentication state from Redux
  const { auth } = useSelector(state => state.auth);

  // UseEffect to check if a token exists (User already authenticated), if so, navigate to homepage
  useEffect(() => {
    if (auth?.token) {
      navigate('/');
    }
  }, [auth, navigate]);

  // Function to handle input change and update state
  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Function to handle form submission, dispatch login action and handle errors
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const action = await dispatch(login(userData));
      if (action.payload.success) {
        navigate('/');
      }
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  return (
    <div>
      <div className="w-full h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="w-full  bg-white shadow sm:rounded-lg flex justify-between flex-1">
          <div className="flex w-1/2 bg-cover bg-login bg-no-repeat "></div>

          <div className="w-1/2  p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full mb-24">
                <div className="flex flex-col items-left">
                  <Link
                    to="/"
                    className="text-smalltext flex items-center hover:text-blue-600 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      ></path>
                    </svg>
                    Back to Home
                  </Link>
                </div>
              </div>
              <h1 className="text-2xl xl:text-3xl font-extrabold">Welcome Back</h1>
              <p className="mt-2">Dicover a better wat of spanding with Dental Connect</p>
              <div className="w-full flex-1 mt-24">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="mx-auto w-3/5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className=" text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300 mb-4"
                      placeholder="EMAIL"
                      required=""
                      onChange={handleChangeInput}
                      value={email}
                      aria-label="Email Address"
                    />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="PASSWORD"
                      className="text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300"
                      required=""
                      onChange={handleChangeInput}
                      value={password}
                    />
                    <button
                      className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                      </svg>
                      <span className="ml-3">Login</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree with the
                      <a href="#" className="border-b border-gray-500 border-dotted mx-1">
                        Terms of Service
                      </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted ml-1">
                        Privacy Policy
                      </a>
                    </p>
                    <p className="text-center mt-6">
                      Not a member yet? <Link to="/Register">Create an account</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

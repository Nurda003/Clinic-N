import React from 'react'
import NavBar from '../comps/NavBar'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Login() {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(state => state.auth);

  useEffect(() => {
    if (auth?.token) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(login(userData));
      navigate('/');
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <div>
        <NavBar />
        <div className="w-full h-screen bg-gray-100 text-gray-900 flex justify-center" >
            <div className="w-full  bg-white shadow sm:rounded-lg flex justify-between flex-1">
                <div className="flex w-1/2 bg-cover bg-login bg-no-repeat ">
                </div>

                <div className="w-1/2  p-6 sm:p-12">
                    
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Welcome Back
                        </h1>
                        <p className='mt-2'>Dicover a better wat of spanding with Dental Connect</p>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold border-2 border-gray-400 shadow-sm rounded-lg py-3 bg-white text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4" />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853" />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04" />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Sign Up with Google
                                    </span>
                                </button>
                            </div>

                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or start with e-mail
                                </div>
                            </div>
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
                      value={password} />
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type='submit'>
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                    </svg>
                                    <span className="ml-3">
                                        Login
                                    </span>
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
                                <p className='text-center mt-6'>Not a member yet? <Link to="/Register">Create an account</Link></p>
                            </div>
                          </form>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Login
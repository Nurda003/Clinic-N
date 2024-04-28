import NavBar from '../comps/NavBar'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';




function Register() {

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
 // Initializing the formData state to hold form input values
  const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
        role: 'user'
    });

  // Function to handle input changes and set the formData state
  const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPass, role } = formData; // Added role here
        if(password !== confirmPass){
            alert("Passwords don't match!");
            return;
        }
    
        const newUser = {
            fullname: username,
            username,
            email,
            password,
            role,
            gender: 'Male', 
        };
    
        dispatch(register(newUser))
    .then(res => {
      if (res && res.success) {
        // update role in your Redux store 
        dispatch({ type: 'USER_ROLE_UPDATE', payload: newUser.role });

          setMessage('Registration successful!');
          setTimeout(() => {
            navigate('/Login');
          }, 2000);
        }
      
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPass: '',
          role: '',
        }); 
      
        setTimeout(() => {
          setMessage('');
        }, 5000);
      })
      .catch(err => {
        setMessage(''); 
        setErrorMessage(err); 
        console.log(err)
            
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
    
  };

  return (
    <div>
        <NavBar />
        <div className="w-full bg-gray-100 text-gray-900 flex justify-center h-screen" >
            <div className="w-full  bg-white shadow sm:rounded-lg flex justify-between flex-1">
                <div className="flex w-1/2 bg-cover bg-register bg-no-repeat ">
                </div>

                <div className="w-1/2  p-6 sm:p-12">
                    
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Create an account
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

                            <form onSubmit={handleSubmit}>

                                <div className="mx-auto w-3/5">
                                <input
                                    id="username"
                                    name="username"
                                    onChange={handleChange}
                                    className="text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.username}
                                />

                                <input
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    className="text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300 mt-5"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                />

                                <input
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    className="text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300 mt-3"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                />
                                <input
                                    type="password"
                                    name="confirmPass"
                                    id="confirmPass"
                                    placeholder="Confirm Password"
                                    className="text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300 mt-5"
                                    value={formData.confirmPass}
                                    onChange={handleChange}
                                    required
                                    />
                                    <select
                                        id="role"
                                        name="role"
                                        onChange={handleChange}
                                        value={formData.role}
                                        className="text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300 mt-5"
                                        required
                                    >
                                        <option value="user">User</option>
                                        <option value="medicalStoreWorker">Medical Store Worker</option>
                                    </select>
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Sign Up
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

export default Register

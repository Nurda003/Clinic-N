import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';

function Register() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
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
        const { username, email, password, confirmPass, role } = formData;
        
        if(password !== confirmPass) {
            setError("Passwords don't match!");
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
        setLoading(true);
        setError(null);
        
        dispatch(register(newUser))
            .then(res => {
                if (res && res.success) {
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        confirmPass: '',
                        role: '',
                    }); 
                    navigate('/Login');
                } else {
                    setError(res.error || 'Registration failed. Please try again.');
                }
            })
            .catch(err => {
                setError(err.error || 'An unexpected error occurred. Please try again.');
            })  
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="w-full bg-gray-100 text-gray-900 flex justify-center h-screen">
                <div className="w-full bg-white shadow sm:rounded-lg flex justify-between flex-1">
                    <div className="flex w-1/2 bg-cover bg-register bg-no-repeat">
                    </div>

                    <div className="w-1/2 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <div className='w-full mb-16'>
                                <div className="flex flex-col items-left">
                                    <Link to='/' className='text-smalltext flex items-center hover:text-blue-600 transition-colors duration-200'>
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                        </svg>
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Create an account
                            </h1>
                            <p className='mt-2'>Dicover a better wat of spanding with Dental Connect</p>
                            <div className="w-full flex-1 mt-8">
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
                                        {error && (
                                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                                {error}
                                            </div>
                                        )}
                                        <button
                                            disabled={loading}
                                            className={`mt-5 tracking-wide font-semibold ${loading ? 'bg-blue-300' : 'bg-blue-500'} text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>
                                            {loading ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <>
                                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                                        strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                        <circle cx="8.5" cy="7" r="4" />
                                                        <path d="M20 8v6M23 11h-6" />
                                                    </svg>
                                                    <span className="ml-3">
                                                        Sign Up
                                                    </span>
                                                </>
                                            )}
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

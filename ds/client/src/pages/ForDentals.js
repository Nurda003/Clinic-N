import React, { useState } from 'react'
import NavBar from '../comps/NavBar'
import Footer from '../comps/Footer'
import first from '../img/firsticon.png'
import second from '../img/secondicon.png'
import third from '../img/thirdicon.png'
import fourth from '../img/fourthicon.png'
import { Link } from 'react-router-dom'
import axios from 'axios';

function ForDentals() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await axios.post('/api/partnership', formData);
            console.log('response', response)
            setMessage('Your partnership request has been submitted successfully! We will contact you soon.');
            setFormData({
                fullName: '',
                phoneNumber: '',
                email: ''
            });
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred while submitting your request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className='px-20 py-10'>
                <NavBar className='' />
                <div className="">
                    <div className="bg-part h-500 bg-no-repeat bg-cover mt-10 -mx-20 flex justify-center items-start flex-col gap-10">
                        <div className="ml-10% flex flex-col gap-5">
                            <h1 className='text-bigtext text-5xl font-bold'>Become Partner</h1>
                            <p className='text-bigtext text-lg font-normal w-9/12'>Get more clients through the site and increase your reputation in the world of clinics</p>
                        </div>
                        <Link to='/Register' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-3xl px-7 ml-10%'>Start</Link>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className=" flex flex-col justify-center items-center gap-6">
                            <h1 className='text-bigtext text-5xl font-bold mt-16 '>Better than Property Management</h1>
                            <p className='text-bigtext text-lg font-normal w-2/5 text-center'>We work with 100+  companies to meet accommodation needs in London. Offer a dedicated booking manager that can help to find properties for your needs.</p>   
                        </div>

                        <div className='w-full flex gap-1 items-start justify-center px-2 py-5 mt-10'>
                            <div className="p-4">
                                <div className="block max-w-sm p-6 bg-card rounded-lg shadow hover:bg-gray-100 ">
                                    <img src={first} alt="" />
                                    <h5 className="mb-5 mt-2 w-1/4 text-2xl font-bold tracking-tight text-bigtext ">Streamlined Appointment Management</h5>
                                    <p className="font-normal text-bigtext">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="block max-w-sm p-6 bg-card rounded-lg shadow hover:bg-gray-100 ">
                                    <img src={second} alt="" />
                                    <h5 className="mb-5 mt-2 w-full text-2xl font-bold tracking-tight text-bigtext ">Increased Visibility and Patient Acquisition</h5>
                                    <p className="font-normal text-bigtext">By listing on Dental Connect, clinics gain exposure to a wider audience of potential patients.</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="block max-w-sm p-6 bg-card rounded-lg shadow hover:bg-gray-100 ">
                                    <img src={third} alt="" />
                                    <h5 className="mb-5 mt-2 w-full text-2xl font-bold tracking-tight text-bigtext ">Enhanced Patient Engagement and Retention</h5>
                                    <p className="font-normal text-bigtext">Dental Connect's interactive features, such as the ability to respond to patient reviews and feedback, foster a positive online presence and build trust among potential and existing patients.</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="block max-w-sm p-6 bg-card rounded-lg shadow hover:bg-gray-100 ">
                                    <img src={fourth} alt="" />
                                    <h5 className="mb-5 mt-2 w-full text-2xl font-bold tracking-tight text-bigtext ">Data-Driven Insights for Business Growth</h5>
                                    <p className="font-normal text-bigtext">The platform offers valuable analytics and reporting tools that enable clinics to monitor appointment trends, patient feedback, and other key performance indicators</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 h-500 flex justify-center items-center gap-10 -mx-20 ">
                        <div className="flex flex-col justify-center gap-5 text-white">
                            <h1 className='font-semibold text-5xl w-3/5'>Leave a Request For Premium Partner</h1>
                            <p className='font-normal text-lg w-1/2'>Leave a request to become a partner and our managers will get in contact with you as soon as possible</p>
                        </div>
                        <div className="flex justify-center w-1/4 items-center">
                            <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col p-14 w-full bg-white gap-6 rounded-xl">
                                <p className='text-center font-semibold text-2xl w-full mb-5'>Request Partnership</p>
                                {message && (
                                    <div className={`w-full p-3 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {message}
                                    </div>
                                )}
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className='text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300' 
                                    placeholder='Full Name'
                                    required 
                                />
                                <input 
                                    type="tel" 
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className='text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300' 
                                    placeholder='Phone Number'
                                    required 
                                />
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='text-bigtext sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-500 border-2 border-gray-300' 
                                    placeholder='Email Address'
                                    required 
                                />
                                <button 
                                    type='submit'
                                    disabled={isSubmitting}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-xl px-7 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-20 w-full flex justify-center">
                        <ol className="relative border-s border-gray-200 flex flex-col justify-center w-2/5">                  
                            <li className="mb-10 ms-6 w-full">            
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                                    <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </span>
                                <h3 className="flex items-center mb-3 text-xl font-semibold text-gray-900">Register Your Clinic<span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">First</span></h3>
                                <p className="mb-4 text-xl font-normal text-gray-500">Submit the required documentation for verification to ensure the authenticity of your clinic. This process may take a short while, after which you will receive confirmation of your account activation.</p>
                            </li>
                            <li className="mb-10 ms-6 w-full">            
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                                    <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </span>
                                <h3 className="flex items-center mb-3 text-xl font-semibold text-gray-900">Set Up Your Profile<span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">Second</span></h3>
                                <p className="mb-4 text-xl font-normal text-gray-500">Once registered, access your clinic dashboard to customize your profile. Add detailed information about your clinic, including specialties, dentist profiles, opening hours, and high-quality images.</p>
                            </li>
                            <li className="mb-10 ms-6 w-full">            
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                                    <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </span>
                                <h3 className="flex items-center mb-3 text-xl font-semibold text-gray-900">Manage Appointments<span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">Third</span></h3>
                                <p className="mb-4 text-xl font-normal text-gray-500">Receive appointment requests from patients, which you can either confirm or reschedule through the dashboard.</p>
                            </li>
                            <li className="mb-10 ms-6 w-full">            
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                                    <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </span>
                                <h3 className="flex items-center mb-3 text-xl font-semibold text-gray-900">Track Performance<span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">Fourth</span></h3>
                                <p className="mb-4 text-xl font-normal text-gray-500">Monitor your clinic's performance through analytics and reports. Track patient satisfaction, appointment statistics, and revenue metrics.</p>
                            </li>
                            <li className="ms-6">            
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                                    <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </span>
                                <h3 className="flex items-center mb-3 text-xl font-semibold text-gray-900">Go!<span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">Last</span></h3>
                                <p className="mb-4 text-xl font-normal text-gray-500">Now you're ready to receive patients. Good luck!</p>
                            </li>
                        </ol>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ForDentals
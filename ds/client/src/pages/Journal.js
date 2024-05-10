
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../comps/NavBar'
import cli1 from '../img/clinics1.png'
import cli2 from '../img/clinics2.png'
import cli3 from '../img/clinics3.png'
import Footer from '../comps/Footer'
import locationI from '../img/location.svg'


function Journal() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError("You must be logged in to view bookings.");
            setIsLoading(false);
            return;
        }

        axios.get('/api/my-bookings', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            setBookings(response.data);
            setIsLoading(false);
            if (response.data.length === 0) {
                setError("No bookings found.");
            }
        })
        .catch(error => {
            console.error("Error fetching bookings: ", error);
            setError("Failed to fetch bookings. Please try again.");
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const getRatingText = (rating) => {
        if (rating >= 4.5) {
        return 'Very Good';
        } else if (rating >= 4) {
        return 'Good';
        } else {
        return 'Normal';
        }
    }



  return (
    <div className='bg-navbg rounded-xl '>
        <NavBar />
        <div className="">
            
            <form className="w-11/12 rounded-2xl flex items-center mx-auto h-36 bg-white">
                <div className="flex p-10 w-full justify-between ">
                    <div className="">
                        <h1 className='text-6xl text-blue-600 font-semibold mr-10% '>Journal</h1>

                    </div>
                    
                    <div className="flex items-center gap-1">
                        <p className='font-bold'>Sort by:</p>
                        <p className="flex items-center py-2.5 px-4 text-base font-semibold text-center text-blue-600 bg-white" type="button">
                            Date
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </p>                      
                    </div>
                </div>
            </form>
        </div>


        <div className=" flex flex-col justify-center items-center py-5">
            
            <div className="flex flex-col w-11/12 justify-center items-center">

            
                <div className="flex w-full flex-col  gap-10 p-3 rounded-2xl bg-white items-center mt-10">
                
                {error && <p>{error}</p>}
                <div className="flex flex-col justify-center items-center py-5">
                <h1 className="text-4xl text-center font-bold mb-5">My Bookings</h1>
            {bookings.map((booking) => (
                <div key={booking._id} className="flex w-full gap-6 p-3 rounded-2xl bg-white items-center mt-10">
                     
                    <div className="w-heroimg">
                        {booking.clinicId?.image?.filename
                            ? <img src={`/api/image/${booking.clinicId.image.filename}`} alt={booking.clinicId.name} />
                            : <img src={cli1} alt="Default Clinic" />
                        }
                    </div>
                    <div className="w-full p-3 bg-white">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col gap-3">
                                <h1 className='text-2xl font-bold text-bigtext'>{booking.clinicId.name}</h1>
                                <p className='text-base text-smalltext'>
                                    <span className='flex gap-3'>
                                        <img src={locationI} alt="" width="25px" />
                                        {booking.clinicId.address}
                                    </span>
                                </p>
                                <div className="flex flex-col gap-4">
                                    <p className='font-bold text-bigtext'>Services:</p>
                                    <div className="flex flex-col w-710 gap-2">
                                        {booking.clinicId.services && 
                                            <p className='font-semibold flex'>{booking.clinicId.services.join(' / ')}</p>
                                        }
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className="bg-white border-blue-600 border w-9 text-bigtext text-sm font-semibold justify-center items-center p-1.5 rounded">
                                        <span>{booking.clinicId.rating}</span>
                                    </p>
                                    <p className='font-semibold'>{getRatingText(booking.clinicId.rating)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className='text-base text-smalltext font-semibold'>Booked by:</p>
                                <p className='text-xl text-blue-700 font-semibold max-w-80'>{booking.firstName} {booking.lastName}</p>
                                <p className='text-base text-smalltext'>On: {new Date(booking.date).toLocaleDateString()}</p>
                                <p className='text-base text-smalltext'>Message: {booking.message}</p>
                            </div>
                        </div>
                        <hr className='w-full bg-gray-500 my-4' />
                    </div>
                </div>
            ))}
        </div>
                </div>
                
                
            </div>
        </div>
        
        

        <Footer />
    </div>
  )
}

export default Journal
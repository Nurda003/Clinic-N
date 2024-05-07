
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../comps/NavBar'
import cli1 from '../img/clinics1.png'
import cli2 from '../img/clinics2.png'
import cli3 from '../img/clinics3.png'
import Footer from '../comps/Footer'

function Journal() {
  // Using React Hooks, establish a state variabel for bookings
  const [bookings, setBookings] = useState([]); 

  useEffect(() => {
    // Fetch the user's bookings when the component mounts
    axios.get('/api/my-bookings') // Use your authenticated request handler here
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ", error);
      })
  }, []);
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


                <div className="flex w-full  gap-10 p-3 rounded-2xl bg-white items-center mt-10">
                    {bookings.map((booking, index) => (
                        <div key={index}>
                            {/* Rest of the booking info here like email, phonenumber, date etc */}
                            <h1>{booking.firstName} {booking.lastName}</h1>
                        </div>
                    ))}
                </div>
                
                
            </div>
        </div>
        
        

        <Footer />
    </div>
  )
}

export default Journal
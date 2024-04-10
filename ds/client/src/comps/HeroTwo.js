import React from 'react'
import clock from '../img/Clock.png'
import find from '../img/find.png'
import star from '../img/Star.png'

function HeroTwo() {
  return (
    <div className='w-full h-400 bg-navbg rounded-xl flex items-center justify-around'>
        <div className="bg-white flex flex-col items-center justify-center gap-5 w-96 h-72 rounded-xl">
            <div className='rounded-full bg-clock w-16 h-16 flex items-center justify-center'>
                <img src={clock} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center mt-2">
                <h3 className='text-bigtext text-2xl'>Appointment Scheduling</h3>
                <p className='text-smalltext text-xl w-80 text-center mt-2'>View clinic availabilities and book appointments effortlessly.</p>
            </div>
            <p className='text-bigtext text-2xl'>Learn More</p>
        </div>

        <div className="bg-white flex flex-col items-center justify-center gap-5 w-96 h-72 rounded-xl">
            <div className='rounded-full bg-clock w-16 h-16 flex items-center justify-center'>
                <img src={find} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center mt-2">
                <h3 className='text-bigtext text-2xl'>Search and Filter Clinics</h3>
                <p className='text-smalltext text-xl w-80 text-center mt-2'>Find clinics by location, service, or rating to meet your needs.</p>
            </div>
            <p className='text-bigtext text-2xl'>Learn More</p>
        </div>


        <div className="bg-white flex flex-col items-center justify-center gap-5 w-96 h-72 rounded-xl">
            <div className='rounded-full bg-clock w-16 h-16 flex items-center justify-center'>
                <img src={star} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center mt-2">
                <h3 className='text-bigtext text-2xl'>Ratings and Reviews</h3>
                <p className='text-smalltext text-xl w-80 text-center mt-2'>Share your experience and feedback for clinics you’ve visited.</p>
            </div>
            <p className='text-bigtext text-2xl'>Learn More</p>
        </div>
    </div>
  )
}

export default HeroTwo
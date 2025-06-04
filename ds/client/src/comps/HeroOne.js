import React from 'react';
import heroimg from '../img/hero-1.png';
import under from '../img/under.svg';
import herounder from '../img/herounder.png';
import ln from '../img/ln.png';
import { Link } from 'react-router-dom';

function HeroOne() {
  return (
    <div className="flex items-center justify-around p-5">
      <div className="flex flex-col">
        <div className="mb-3">
          <h1 className="text-6.5 font-bold text-bigtext tracking-wide">Explore Book Smile</h1>
          <img src={under} alt="" className="ml-28" />
        </div>
        <div className="w-1/2 mb-10">
          <p className="font-normal text-lg tracking-wide text-smalltext">
            Discover the ease of finding the right dental care for you and your family. Your gateway
            to hassle-free dental bookings online
          </p>
        </div>
        <div className="mb-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 rounded-lg px-7">
            <Link to="/Clinics">Book an appointment</Link>
          </button>
        </div>
        <div className="w-96">
          <div className="flex items-center gap-5 ">
            <div>
              <img src={herounder} alt="" />
            </div>
            <div className="w-full">
              <p>Happy Dental</p>
              <p>Sr Dental</p>
            </div>
            <div>
              <img src={ln} alt="" />
            </div>
          </div>
          <div className="font-normal text-sm tracking-wide text-bigtext w-72">
            <p>
              Top Quailty dental treatment done by field experts, Highly Recommended for everyone
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img src={heroimg} className=" bg-gradient-to-t from-white to-white" alt="" />
      </div>
    </div>
  );
}

export default HeroOne;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../comps/NavBar';
import cli1 from '../img/clinics1.png';
import Footer from '../comps/Footer';
import locationI from '../img/location.svg';

function Journal() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('You must be logged in to view bookings.');
      setIsLoading(false);
      return;
    }

    axios
      .get('/api/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setBookings(response.data);
        setIsLoading(false);
        if (response.data.length === 0) {
          setError('No bookings found.');
        }
      })
      .catch(error => {
        console.error('Error fetching bookings: ', error);
        setError('Failed to fetch bookings. Please try again.');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const getRatingText = rating => {
    if (rating >= 4.5) return 'Very Good';
    if (rating >= 4) return 'Good';
    return 'Normal';
  };

  return (
    <div className="bg-navbg rounded-xl">
      <NavBar />
      <div className="w-11/12 mx-auto">
        <form className="rounded-2xl flex items-center h-36 bg-white">
          <div className="flex p-10 w-full justify-between">
            <h1 className="text-6xl text-blue-600 font-semibold">Journal</h1>
            <div className="flex items-center gap-1">
              <p className="font-bold">Sort by:</p>
              <p className="flex items-center py-2.5 px-4 text-base font-semibold text-center text-blue-600 bg-white">
                Date
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </p>
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center py-5">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <h1 className="text-4xl font-bold mb-5">My Bookings</h1>
          {bookings.map(booking => (
            <div
              key={booking._id}
              className="flex w-full gap-4 p-4 rounded-2xl bg-white items-center mb-4"
            >
              <div className="w-48 h-48 flex-shrink-0">
                {booking.clinicId?.image?.filename ? (
                  <img
                    src={`/api/image/${booking.clinicId.image.filename}`}
                    alt={booking.clinicId.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={cli1}
                    alt="Default Clinic"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex-1 p-3">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-bigtext">{booking.clinicId.name}</h1>
                    <p className="text-base text-smalltext flex items-center gap-2">
                      <img src={locationI} alt="" width="20px" />
                      {booking.clinicId.address}
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-bigtext">Services:</p>
                      {booking.clinicId.services && (
                        <p className="font-semibold">{booking.clinicId.services.join(' / ')}</p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="bg-white border-blue-600 border w-8 text-bigtext text-sm font-semibold text-center p-1 rounded">
                        {booking.clinicId.rating}
                      </p>
                      <p className="font-semibold">{getRatingText(booking.clinicId.rating)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <p className="text-base text-smalltext font-semibold">Booked by:</p>
                    <p className="text-xl text-blue-700 font-semibold">
                      {booking.firstName} {booking.lastName}
                    </p>
                    <p className="text-base text-smalltext">
                      On: {new Date(booking.date).toLocaleDateString()}
                    </p>
                    {booking.message && (
                      <p className="text-base text-smalltext">Message: {booking.message}</p>
                    )}
                  </div>
                </div>
                <hr className="w-full bg-gray-200 my-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Journal;

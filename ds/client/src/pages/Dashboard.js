import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../comps/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const user = useSelector(state => state.auth.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clinic, setClinic] = useState({
    name: '',
    address: '',
    image: '',
    doctor: '',
    price: '',
    services: [],
  });
  const [bookings, setBookings] = useState([]);
  const [myClinics, setMyClinics] = useState([]);

  const handleImageChange = e => {
    setClinic({ ...clinic, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
  };

  const handleChange = e => {
    setClinic({ ...clinic, [e.target.name]: e.target.value });
  };

  const servicesList = [
    'Braces and Orthodontic Treatments',
    'Dental Cleanings and Check-ups',
    'Teeth Whitening Services',
    'Cosmetic Dentistry',
    'Restorative Dentistry',
    'Periodontal (Gum) Care',
    'Oral Surgery',
    'Emergency Dental Care',
  ];

  const handleCheckboxChange = event => {
    if (event.target.checked) {
      setClinic(prevClinic => ({
        ...prevClinic,
        services: [...prevClinic.services, event.target.value],
      }));
    } else {
      setClinic(prevClinic => ({
        ...prevClinic,
        services: prevClinic.services.filter(service => service !== event.target.value),
      }));
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchMyClinics = async () => {
    const response = await axios.get('/api/my-clinics', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    setMyClinics(response.data);
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Bookings ', response.data);
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings: ', err);
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', clinic.name);
    formData.append('address', clinic.address);
    formData.append('image', clinic.image);
    formData.append('doctor', clinic.doctor);
    formData.append('price', clinic.price);

    clinic.services.forEach(service => {
      formData.append('services', service);
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      await axios
        .post('/api/clinics', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })
        .then(() => {
          toggleModal();
          setClinic({
            name: '',
            address: '',
            image: '',
            price: '',
            doctor: '',
            services: [],
          });
          fetchMyClinics();
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyClinics();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    fetchBookings();
  }, []);

  if (user?.role !== 'medicalStoreWorker') {
    return <div>You are not authorized to view this page</div>;
  }

  return (
    <div>
      <div>
        <div>
          <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                    <span className="self-center whitespace-nowrap">
                      <Link to="/">Clinics page</Link>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex overflow-hidden bg-white pt-16">
            <aside
              id="sidebar"
              className="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
              aria-label="Sidebar"
            >
              <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div className="flex-1 px-3 bg-white divide-y space-y-1">
                    <ul className="space-y-2 pb-2">
                      <li></li>
                      <li>
                        <Link
                          to="/Dashboard"
                          className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                        >
                          <svg
                            className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                          </svg>
                          <span className="ml-3">Dashboard</span>
                        </Link>
                      </li>
                    </ul>
                    <div className="space-y-2 pt-2">
                      <Link
                        to="#"
                        target="_blank"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                      >
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3">Help</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <div
              className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
              id="sidebarBackdrop"
            ></div>
            <div
              id="main-content"
              className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64"
            >
              <main>
                <div className="pt-6 px-4">
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h1 className="text-bigtext text-4xl p-3">Your Clinic</h1>
                      {myClinics.length === 0 && (
                        <button
                          onClick={toggleModal}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Create New Clinic
                        </button>
                      )}
                    </div>

                    {myClinics.length > 0 && myClinics[0] && (
                      <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            {myClinics[0].image?.filename ? (
                              <img
                                src={`/api/image/${myClinics[0].image.filename}`}
                                alt={myClinics[0].name}
                                className="w-24 h-24 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">
                                {myClinics[0].name}
                              </h2>
                              <p className="text-gray-600 flex items-center mt-1">
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                {myClinics[0].address}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                              Clinic Information
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <svg
                                  className="w-5 h-5 text-gray-500 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                <span className="text-gray-600">Doctor: {myClinics[0].doctor}</span>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-5 h-5 text-gray-500 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-gray-600">Price: ${myClinics[0].price}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                              Services Offered
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {myClinics[0].services.map((service, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {isModalOpen && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="relative mx-auto p-6 border w-1/3 shadow-lg rounded-md bg-white">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Create New Clinic</h3>
                            <button
                              onClick={toggleModal}
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          <form
                            className="w-full relative overflow-y-auto"
                            action="/upload"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleFormSubmit}
                          >
                            <div className="relative z-0 w-full mb-5 group mt-2">
                              <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                id="name"
                                name="name"
                                type="text"
                                aria-label="Enter the clinic name"
                                value={clinic.name}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Clinic Name
                              </label>
                            </div>
                            <div className=" relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                id="address"
                                name="address"
                                aria-label="Enter the address"
                                required
                                value={clinic.address}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floating_password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 p peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Clinic Address
                              </label>
                            </div>
                            <div className=" relative z-0 w-full mb-5 group">
                              <input
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                id="doctor"
                                name="doctor"
                                aria-label="Enter the doctor's name"
                                required
                                value={clinic.doctor}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floating_doctor"
                                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 p peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Doctor's Name
                              </label>
                            </div>
                            <div className=" relative z-0 w-full mb-5 group">
                              <input
                                type="number"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                id="price"
                                name="price"
                                aria-label="Enter the price"
                                required
                                value={clinic.price}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floating_price"
                                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 p peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Price
                              </label>
                            </div>
                            <div className="w-full mb-5 group">
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 "
                                htmlFor="user_avatar"
                              >
                                Upload file
                              </label>
                              <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                                aria-describedby="user_avatar_help"
                                id="user_avatar"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                              <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">
                                A profile picture is useful to confirm your account
                              </div>
                            </div>
                            <div className="w-full mb-5 group flex flex-col">
                              <label htmlFor="services">Services:</label>
                              <span className="border border-1 border-gray-500 rounded-md p-2 flex flex-col">
                                {servicesList.map((service, idx) => (
                                  <span key={idx}>
                                    <input
                                      type="checkbox"
                                      className="mr-1"
                                      id={service}
                                      name="services[]"
                                      value={service}
                                      onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor={service}>{service}</label>
                                  </span>
                                ))}
                              </span>
                            </div>

                            <div className="flex justify-end gap-4 mt-4">
                              <button
                                type="button"
                                onClick={toggleModal}
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              >
                                Create Clinic
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mb-14 ">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Customers</h3>
                          <span className="text-base font-normal text-gray-500">
                            This is a list of latest bookings
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                          <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Booking from
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Date & Time
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Email
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Phone Number
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Message
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {bookings.map((booking, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          Booking from{' '}
                                          <span className="font-semibold">
                                            {booking.firstName} {booking.lastName}
                                          </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          {new Date(booking.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          <span className="font-normal">{booking.email}</span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          <span className="font-normal">{booking.phoneNumber}</span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          <span className="font-normal">{booking.message}</span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

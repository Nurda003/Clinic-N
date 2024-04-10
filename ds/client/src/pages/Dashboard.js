import React , { useState } from 'react'
import { useSelector } from 'react-redux';
import Footer from '../comps/Footer';
import { useEffect } from 'react';

import axios from 'axios'; // import axios in your dashboard component
import { Link } from 'react-router-dom';


function Dashboard() {

  const [clinic, setClinic] = useState({ name: '', address: '', image: '', doctor: '', price: '', services: [] });
  const [bookings, setBookings] = useState([]);


  const handleImageChange = (e) => {
    setClinic({ ...clinic, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
  };
  const handleChange = (e) => {
    setClinic({...clinic, [e.target.name]: e.target.value });
  }
  const handleSelectChange = (event) => {
   let services = Array.from(event.target.selectedOptions, option => option.value);
   setClinic(prevState => ({ ...prevState, services }));
 }

 const handleFormSubmit = async (e) => {
   e.preventDefault();
   const formData = new FormData();
   
   formData.append('name', clinic.name);
   formData.append('address', clinic.address);
   formData.append('image', clinic.image);
   formData.append('doctor', clinic.doctor);
   formData.append('price', clinic.price);
   
   clinic.services.forEach(service => {
     formData.append('services', service); // Append each service
   });
   
   for (var pair of formData.entries()) {
     console.log(pair[0] +', '+ pair[1]);
   }
   
   try {
     const response = await axios.post('/api/clinics', formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       },
     });
     
     console.log('Received a POST request for /api/clinics');
     
     if(response.data) {
       setClinic({ name: '', address: '', image: '' , price: '', doctor: '', image: '' ,  services: [] });
     }
   } catch (err) {
       console.error(err);
   }
   
 }

  useEffect(() => {

   const fetchBookings = async () => {
     try {
       const response = await axios.get('/api/bookings');
       console.log("Bookings ", response.data);
       setBookings(response.data);
     } catch (err) {
       console.error("Error fetching bookings: ", err);
     }
   }
   
   fetchBookings();
 
 }, []);
 
 console.log("Bookings state: ", bookings);
 

 

  const user = useSelector(state => state.auth.auth.user);

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
                        <span className="self-center whitespace-nowrap"><Link to='/'>Clinics page</Link></span>
                        </a>

                        </div>

                    </div>
                </div>
            </nav>
    

   <div className="flex overflow-hidden bg-white pt-16">
      <aside id="sidebar" className="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
         <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
               <div className="flex-1 px-3 bg-white divide-y space-y-1">
                  <ul className="space-y-2 pb-2">
                     <li>
        
                     </li>
                     <li>
                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                           <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                           </svg>
                           <span className="ml-3">Dashboard</span>
                        </a>
                     </li>

                     {/* <li>
                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                           <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Bookings</span>
                        </a>
                     </li> */}
                  </ul>
                  <div className="space-y-2 pt-2">
                     <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-3">Help</span>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </aside>
      <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop">
        
      </div>

      <div id="main-content" className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64">

         <main>
          
            <div className="pt-6 px-4">
               <div className="w-full flex flex-col gap-4">
                  <h1 className='w-full text-center text-bigtext text-4xl p-3'>Create your clinics</h1>
                  <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                    <form className="max-w-md mx-auto h-full w-full  relative overflow-y-auto "  action="/upload" method="post" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                      <div className="relative z-0 w-full mb-5 group mt-2">
                          <input  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required id="name" name="name" type="text" aria-label="Enter the clinic name"  value={clinic.name} onChange={handleChange}   />
                          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Clinic Name</label>
                      </div>
                      <div className=" relative z-0 w-full mb-5 group">
                          <input type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " id="address" name="address"  aria-label="Enter the address" required value={clinic.address} onChange={handleChange} />
                          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 p peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Clinic Address</label>
                      </div>
                      <div className=" relative z-0 w-full mb-5 group">
                        <input type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " id="doctor" name="doctor"  aria-label="Enter the doctor's name" required value={clinic.doctor} onChange={handleChange} />
                        <label htmlFor="floating_doctor" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 p peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Doctor's Name</label>
                     </div>
                     <div className=" relative z-0 w-full mb-5 group">
                        <input type="number"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " id="price" name="price"  aria-label="Enter the price" required value={clinic.price} onChange={handleChange} />
                        <label htmlFor="floating_price" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 p peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                     </div>
                      <div className="w-full mb-5 group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="user_avatar">Upload file</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " aria-describedby="user_avatar_help" id="user_avatar"   type="file" name="image" accept="image/*" onChange={handleImageChange} />
                        <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">A profile picture is useful to confirm your account</div>
                      </div>
                      <div className="w-full mb-5 group">
                      <label for="services">Services:</label>
                        <select multiple id="services" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' name="services[]" onChange={handleSelectChange}>
                           <option value="Braces and Orthodontic Treatments">Braces and Orthodontic Treatments</option>
                           <option value="Dental Cleanings and Check-ups">Dental Cleanings and Check-ups</option>
                           <option value="Teeth Whitening Services">Teeth Whitening Services</option>
                           <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                           <option value="Restorative Dentistry">Restorative Dentistry</option>
                           <option value="Periodontal (Gum) Care">Periodontal (Gum) Care</option>
                           <option value="Oral Surgery">Oral Surgery</option>
                           <option value="Emergency Dental Care">Emergency Dental Care</option>
                        </select>
                      </div>

                      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                    </form>
                  </div>

                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mb-14 ">
                     <div className="mb-4 flex items-center justify-between">
                        <div>
                           <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Customers</h3>
                           <span className="text-base font-normal text-gray-500">This is a list of latest bookings</span>
                        </div>
                        <div className="flex-shrink-0">
                           <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</a>
                        </div>
                     </div>
                     <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                           <div className="align-middle inline-block min-w-full">
                              <div className="shadow overflow-hidden sm:rounded-lg">
                                 <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                       <tr>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Booking from
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Date & Time
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Email
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Phone Number
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Message
                                          </th>
                                       </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {bookings.map((booking, index) => {
                                       return (
                                          <tr key={index}>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                             Booking from <span className="font-semibold">{booking.firstName} {booking.lastName}</span>
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
                                       )
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
        <Footer  />
      </div>
   </div>

</div>
    </div>
    </div>
  )
}

export default Dashboard;
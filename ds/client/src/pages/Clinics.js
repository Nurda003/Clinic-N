import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from '../comps/NavBar'
import Footer from '../comps/Footer'
import heart from '../img/heart.png'

import defa from '../img/register.png'

import Datepicker from "tailwind-datepicker-react"

function Clinics() {
    const options = {
        title: 'Choose a booking date',
        autoHide: 'true',
        todayBtn: 'true',
        clearBtn: false,
        clearBtnText: 'Clear',
        maxDate: new Date('2030-01-01'),
        minDate: new Date('2024-01-01'),
        theme: {
            background: 'dark:bg-cyan-900 light:bg-cyan-900',
            todayBtn: 'dark:bg-blue-400 light:bg-blue-400',
            clearBtn: '',
            icons: 'dark:bg-cyan-900 light:bg-cyan-900' ,
            text: ' ',
            disabledText: 'dark:hidden light:hidden',
            input: 'dark:bg-white dark:text-black light:bg-white light:text-black',
            inputIcon: '',
            selected: '',
            title: 'dark:bg-teal-500 dark:text-white light:bg-blue-500 light:text-white',
        },
        icons: {
            prev: function() {
                return <span >Prev</span>;
            },
            next: function() {
                return <span>Next</span>;
            },
        },
        datepickerClassNames: 'top-12',
        defaultDate: new Date('2024-03-27'),
        language: 'en',
        disabledDates: [],
        weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        inputNameProp: 'date',
        inputIdProp: 'date',
        inputPlaceholderProp: 'Select Date',
        inputDateFormatProp: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        },
    };
// State to control visibility of the modal
const [show, setShow] = useState(false);
  
// Function to close the modal 
function handleClose(state) {
  setShow(state);
};

// State to control visibility of the booking modal
const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

// Handle the click of the booking button, opens the modal
const handleBookingClick = () => {
  setIsBookingModalOpen(true);
};

// Handle the close button click event of the modal
const handleModalCloseClick = () => {
  setIsBookingModalOpen(false);
};

// Handle change event of the form fields
const handleFormFieldChange = (e) => {
  e.preventDefault();
  setBookingForm({
    ...bookingForm,
    [e.target.name]: e.target.value
  }); 
};

// Function to format the date
function formatDate(date) {
//...
}

// Handle the date change event
const handleChange = (event) => {
  const {name, value} = event.target;
  setBookingForm(prevFormState => {
    return {...prevFormState, [name]: value};
  });
};

// State to hold the clinincs
const [clinics, setClinics] = useState([]);
  
      function addClinic(newClinic) {
          setClinics([...clinics, newClinic]);
      }

      useEffect(() => {
        const fetchClinics = async () => {
            try {
              const response = await axios.get(`/api/clinics`);
              setClinics(response.data);
            } catch (err) {
              console.error("Error fetching clinics: ", err);
            }
        }
        fetchClinics();
    }, []);
    
// Function to handle form submission
const handleBookingFormSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    axios.post("/api/bookings", bookingForm) // Send a post request with form data
        .then((response) => { // If request is successful ...
            console.log(response); // Log response to console
            setBookingForm({/* initial form state */}); // Reset form fields
        })
        .catch((error) => { // If there is an error ...
            console.log(error); // Log error to console
        });
};

// State to store form data
const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    date: {},
    message: ''
});

// Function to get text for ratings
const getRatingText = (rating) => {
    if (rating >= 4.5) {
    return 'Very Good';
    } else if (rating >= 4) {
    return 'Good';
    } else {
    return 'Normal';
    }
}

// State to hold selected sort option
const [sort, setSort] = useState('');

// Function to handle sorting
const handleSort = (event) => {
    setSort(event.target.value); // Update sort state to selected option
  
    let sortedClinics;
    switch(event.target.value){ // Sort clinics based on selected sort option
        case 'priceHigh':
            sortedClinics = [...clinics].sort((a, b) => b.price - a.price);
            break;
        case 'priceLow':
            sortedClinics = [...clinics].sort((a, b) => a.price - b.price);
            break;
        default:
            sortedClinics = clinics;
            break;
    }
  
    setClinics(sortedClinics); // Update clinics state with sorted clinics
}

  return (
    <div className='bg-navbg rounded-xl'>
        <NavBar />
        <div className="">
            
            <form className="w-11/12 rounded-2xl flex items-center mx-auto h-36 bg-white">
                <div className="flex p-10 w-full justify-between ">
                    <div className="">
                        <h1 className='text-6xl text-blue-600 font-semibold mr-10% '>Clinics</h1>

                    </div>
                    
                    <div className="flex items-center gap-10">

                        <div id="dropdown-button" data-dropdown-toggle="dropdown" className="h-12 w-60 flex justify-between items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border-2 border-gray-400 rounded-lg" type="button">
                            <select value={sort} onChange={handleSort}>
                                <option value="">Sort By</option>
                                <option value="priceLow">Price - Low to High</option>
                                <option value="priceHigh">Price - High to Low</option>
                            </select>
                        </div>
                        
                    </div>
                </div>
                
                

            </form>

        </div>


        <div className=" flex flex-col justify-center items-center py-5">
            
        <div className="flex flex-col w-11/12 justify-center items-center">


        {clinics.map((clinic) => (
            
                <div className="flex w-full gap-6 p-3 rounded-2xl bg-white items-center mt-10">
                    <div className="w-heroimg">
                    { clinic?.image?.filename
                        ? <img src={`api/image/${clinic.image.filename}`} alt={clinic.name} />
                        : <img src={defa} alt="Default" />
                    }
                    </div>
                <div className="w-full p-3 bg-white">
                    <div className="flex w-full justify-between ">
                        <div className="flex flex-col gap-3">
                        
                    {/*... rest of your code ... */}
                    <h1 className='text-2xl font-bold text-bigtext'>{clinic.name}</h1>
                    <p className='text-base text-smalltext'>{clinic.address}</p>
                    {/*... rest of your code ... */}
                    <div className="flex flex-col gap-4">
                        <p className='font-bold text-bigtext'>What we do? </p>
                        <div className="flex items-center">
                            {clinic.services && clinic.services.map(service => (
                                <p className='font-semibold' key={service}>{service}</p>
                            ))}
                        </div>
                        


                    </div>
                            <div className="flex gap-4 items-center">
                                <p className="bg-white border-blue-600 border w-9 text-bigtext text-sm font-semibold justify-center items-center p-1.5 rounded "><span>{clinic.rating}</span></p>
                                <p className='font-semibold'>{getRatingText(clinic.rating)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='text-base text-smalltext font-semibold'>Starting from</p>
                            <p className='text-2xl text-blue-700 font-bold max-w-80'>Doctor: {clinic.doctor}</p>
                            <p className='text-2xl text-blue-700 font-bold'>${clinic.price}</p>

                        </div>
                    </div>
                    <hr className='w-full bg-gray-500 my-4' />
                    <div className=" flex gap-6 items-center">
                        <div className="w-12 h-12 flex justify-center items-center border border-blue-600 rounded-xl">
                            <img src={heart} alt="" />
                        </div> 
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 rounded-lg px-7 w-full' onClick={handleBookingClick}>Book</button>
                    </div>
                </div>
            </div>
            ))}


            {isBookingModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="bg-navbg p-8 rounded-lg">
            <button onClick={handleModalCloseClick}>Close</button>
            <h2 id="modalTitle">Book an Appointment</h2>
            <form id="bookingForm" onSubmit={handleBookingFormSubmit}>
                <div className="flex gap-5">
                    <div className="flex flex-col">
                        <label id="fnameLabel" htmlFor="firstName" className='text-lg text-bigtext ml-1 font-medium'>First Name:</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            className='p-2 border border-gray-400 rounded-xl mt-2'
                            required 
                            aria-describedby="firstNameLabel" 
                            placeholder='First name'
                            value={bookingForm.firstName}
                            onChange={handleFormFieldChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label id="lnameLabel" htmlFor="lastName" className='text-lg text-bigtext ml-1 font-medium'>Last Name:</label>
                        <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        required aria-describedby="lastNameLabel" 
                        className='p-2 border mt-2 border-gray-400 rounded-xl' 
                        placeholder='Last name'
                        value={bookingForm.lastName}
                        onChange={handleFormFieldChange}
                        />
                    </div>

                </div>
                <div className="flex flex-col mt-2">
                    <div className="flex flex-col">
                        <label id="emailLabel" htmlFor="email" className='text-lg text-bigtext ml-1 font-medium'>Email:</label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required aria-describedby="emailLabel" 
                        className='p-2 border border-gray-400 rounded-xl mt-2' 
                        placeholder='Email'
                        value={bookingForm.email}
                        onChange={handleFormFieldChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label id="phoneNumber" htmlFor="phoneNumber" className='text-lg text-bigtext ml-1 mt-2 font-medium'>Phone number:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                            </div>
                            <input 
                            type="text" 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            required aria-describedby="phoneNumberLabel" 
                            className='p-2 border border-gray-400 rounded-xl mt-2' 
                            placeholder='Phone number'
                            value={bookingForm.phoneNumber}
                            onChange={handleFormFieldChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="appointmentDate">Choose a date for your appointment:</label>
                        <input type="date" id="date" name="date" required pattern="\d{4}-\d{2}-\d{2}" aria-describedby="date-format"                              value={bookingForm.date}
                        onChange={handleChange}/>
                        <span id="date-format" className="text-small text-gray-500">Format: YYYY-MM-DD</span>

                    </div>
                    <div className="flex flex-col mt-2">
                        
                        <label htmlFor="message" className="text-lg text-bigtext ml-1 mt-2 font-medium">Message</label>
                        <textarea d="message" name="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your message here..."
                        onChange={handleFormFieldChange}
                        value={bookingForm.message}
                        
                        ></textarea>

                    </div>
                    <button className='w-1/2 mx-auto mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 rounded-lg px-4' >Book an appointment</button>
                    
                </div>
                
                
            </form> 
        </div>
    </div>
)}
        
        </div>
        </div>
        
        

        <Footer />
    </div>
  )
}

export default Clinics

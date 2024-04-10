import React from 'react'
import NavBar from '../comps/NavBar'
import cli1 from '../img/clinics1.png'
import cli2 from '../img/clinics2.png'
import cli3 from '../img/clinics3.png'
import Footer from '../comps/Footer'

function Journal() {
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
                <div className="w-heroimg">
                    <img src={cli1} alt="" />
                </div>
                <div className="w-full bg-white">
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col gap-3">
                            <h1 className='text-2xl font-bold text-bigtext'>Dent X</h1>
                            <p className='text-base text-smalltext'>Almaty, Abaya 108 / Medeu District</p>
                        
                            <div className="flex flex-col gap-1">
                                <p className='text-bigtext text-xl font-semibold'>Visitor</p>
                                <p>Beibit Alibekov</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className='text-bigtext text-xl font-semibold'>Date / Time</p>
                                <p>04.08.2024 / 17:00 - 18:00</p>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col justify-end">
                            <div className="flex items-end gap-28">
                                <div className="flex flex-col gap-3">
                                    <p className='text-bigtext text-base font-bold'>Type</p>
                                    <p>Braces</p>
                                    <p className='text-bigtext text-base font-bold'>Price</p>
                                    <p>Braces</p>
                                </div>
                                
                                <div className="">
                                    <p className='text-bigtext text-base font-bold'>$400</p>
                                </div>
                            </div>
                            
                            <button className='px-2 py-2.5 text-sm font-medium text-white bg-gray-500  focus:ring-4 focus:outline-none rounded-lg text-cente'>Details</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex w-full  gap-10 p-3 rounded-2xl bg-white items-center mt-10">
                <div className="w-heroimg">
                    <img src={cli2} alt="" />
                </div>
                <div className="w-full bg-white">
                    <div className="flex w-full justify-between ">
                        <div className="flex flex-col gap-3">
                            <h1 className='text-2xl font-bold text-bigtext'>Dentis Tree</h1>
                            <p className='text-base text-smalltext'>Almaty, Dostyk 55 / Medeu District</p>
                        
                            <div className="flex flex-col gap-1">
                                <p className='text-bigtext text-xl font-semibold'>Visitor</p>
                                <p>Arman Zhakupov</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className='text-bigtext text-xl font-semibold'>Date / Time</p>
                                <p>04.08.2024 / 17:00 - 18:00</p>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col justify-end">
                            <div className="flex items-end gap-28">
                                <div className="flex flex-col gap-3">
                                    <p className='text-bigtext text-base font-bold'>Type</p>
                                    <p>Braces</p>
                                    <p className='text-bigtext text-base font-bold'>Price</p>
                                    <p>Braces</p>
                                </div>
                                
                                <div className="">
                                    <p className='text-bigtext text-base font-bold'>$400</p>
                                </div>
                            </div>
                            
                            <button className='px-2 py-2.5 text-sm font-medium text-white bg-gray-500  focus:ring-4 focus:outline-none rounded-lg text-cente'>Details</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full  gap-10 p-3 rounded-2xl bg-white items-center mt-10">
                <div className="w-heroimg">
                    <img src={cli3} alt="" />
                </div>
                <div className="w-full bg-white">
                    <div className="flex w-full justify-between ">
                        <div className="flex flex-col gap-3">
                            <h1 className='text-2xl font-bold text-bigtext'>Tru Dental</h1>
                            <p className='text-base text-smalltext'>Almaty, Nauryzbay Batyra 55 / Medeu District</p>
                        
                            <div className="flex flex-col gap-1">
                                <p className='text-bigtext text-xl font-semibold'>Visitor</p>
                                <p>Beibit Alibekov</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className='text-bigtext text-xl font-semibold'>Date / Time</p>
                                <p>04.08.2024 / 17:00 - 18:00</p>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col justify-end">
                            <div className="flex items-end gap-28">
                                <div className="flex flex-col gap-3">
                                    <p className='text-bigtext text-base font-bold'>Type</p>
                                    <p>Braces</p>
                                    <p className='text-bigtext text-base font-bold'>Price</p>
                                    <p>Braces</p>
                                </div>
                                
                                <div className="">
                                    <p className='text-bigtext text-base font-bold'>$400</p>
                                </div>
                            </div>
                            
                            <button className='px-2 py-2.5 text-sm font-medium text-white bg-gray-500  focus:ring-4 focus:outline-none rounded-lg text-cente'>Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
        

        <Footer />
    </div>
  )
}

export default Journal
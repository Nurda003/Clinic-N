import React from 'react'
import NavBar from '../comps/NavBar'
import HeroOne from '../comps/HeroOne'
import HeroTwo from '../comps/HeroTwo'
import Footer from '../comps/Footer'
import { useSelector } from 'react-redux'


function Home() {
  const { auth } = useSelector(state => state.auth);
  return (
    <div className='px-20 py-10'>
        <NavBar key={auth?.token}/>
        <HeroOne />
        <HeroTwo />
        <Footer />
    </div>
  )
}

export default Home
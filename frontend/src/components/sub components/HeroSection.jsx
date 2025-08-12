import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useSelector } from 'react-redux'

const HeroSection = () => {
    const {user} = useSelector(store=> store.auth);
  return (
        <div>
        <div className='flex flex-col items-center p-4 gap-5 my-8'>
            <span className='bg-blue-200 px-4 py-1 font-bold text-pink-500 rounded-3xl'>Wellcome {user?.fullname} To Hire<span className='text-blue-700'>Me!</span></span>
            <h1 className='text-4xl font-bold'>We Are <sup>No. 1</sup> In <span className='text-blue-600 text-5xl'>Job Hunting</span> Platforms <br /> <h2 className='text-center text-3xl mt-2'>Get Dream Job With <span className='text-blue-600 '>HireMe</span></h2> </h1>
            <p className='text-gray-700 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vitae? Lorem ipsum dolor sit.</p>
            <div className='rounded-3xl shadow-lg mx-auto border-[1px] border-blue-500 flex flex-row px-1 py-1 items-center w-[40%]'>
                <input type="text" className='p-1 outline-none border-none w-full mx-2' placeholder='Internship......!' />
                <Button className='bg-blue-600 cursor-pointer flex flex-row rounded-2xl'>
                    SEARCH<Search/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default HeroSection


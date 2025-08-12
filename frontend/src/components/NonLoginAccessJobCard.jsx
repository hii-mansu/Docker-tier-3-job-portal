import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { BadgeCheckIcon, Bookmark } from 'lucide-react'

const NonLoginAccessJobCard = () => {
  return (
    <div className='py-[21px] px-[15px] min-h-[250px] shadow-2xl rounded-2xl'>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-gray-600'>Posted On 21/07/2025</p>
        <Button className='rounded-full' variant='outline' size="icon"> <Bookmark/> </Button>
      </div>

      <div className='flex flex-row gap-3 items-center'>
        <Button className="p-2" variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src="https://i.ibb.co/6NZZPj7/visual-studio.png" />
          </Avatar>
        </Button>
        <div className='flex flex-col gap-[2px]'>
          <div className='flex flex-row gap-2'>
            <h1 className='font-medium'>META</h1>
           {<Badge
          variant="secondary"
          className="bg-white text-cyan-600 dark:bg-blue-600 rounded-full">
          <BadgeCheckIcon />
        </Badge>} 
          </div>
          <p className='text-gray-600'>India</p>
        </div>
      </div>

      <div className='mt-[21px]'>
        <h1 className='font-semibold'>Data Science</h1>
        <p className='text-gray-700'>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
      </div>

      <div className='flex flex-row justify-around mt-3'>
        <span className='bg-gray-100 text-gray-800 px-3 text-[12px] font-semibold py-1 rounded-full border'>21 LPA</span>
        <span className='bg-blue-100 text-gray-800 px-3 text-[12px] font-semibold py-1 rounded-full border'>721</span>
        <span className='bg-pink-100 text-gray-800 px-3 text-[12px] font-semibold py-1 rounded-full border'>Full-Time</span>
      </div>

      <div className='flex flex-row gap-5 mt-5'>
        <Button className='bg-blue-600 px-3 py-1 rounded-2xl' onClick={()=>Navigate(`/Job-details/${id}`)}>Details</Button>
        <Button className='border-2 border-blue-600 px-3 py-1 rounded-2xl bg-white text-blue-600'>Save For Later</Button>
      </div>
    </div>
  
  )
}

export default NonLoginAccessJobCard
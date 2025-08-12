import React from 'react'
import { Button } from '../ui/button'
import { Badge, BadgeCheckIcon, Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useNavigate } from 'react-router-dom'

const JobCardJobPage = ({job}) => {
  const id = job._id;
 const Navigate = useNavigate();
  return (
    <div className='py-[21px] px-[15px] min-h-[250px] shadow-2xl rounded-2xl'>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-gray-600'>Posted On {job?.createdAt}</p>
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
            <h1 className='font-medium'>{job?.company?.name}</h1>
           {<Badge
          variant="secondary"
          className="bg-white text-cyan-600 dark:bg-blue-600 rounded-full">
          <BadgeCheckIcon />
        </Badge>} 
          </div>
          <p className='text-gray-600'>{job?.location}</p>
        </div>
      </div>

      <div className='mt-[21px]'>
        <h1 className='font-semibold'>{job?.title}</h1>
        <p className='text-gray-700'>{job?.description}</p>
      </div>

      <div className='flex flex-row justify-around mt-3'>
        <span className='bg-gray-100 text-gray-800 px-3 text-[12px] font-semibold py-1 rounded-full border'>{job?.salary}</span>
        <span className='bg-blue-100 text-gray-800 px-3 text-[12px] font-semibold py-1 rounded-full border'>{job?.position}</span>
        <span className='bg-pink-100 text-gray-800 px-3 text-[12px] font-semibold py-1 rounded-full border'>{job?.jobType}</span>
      </div>

      <div className='flex flex-row gap-5 mt-5'>
        <Button className='bg-blue-600 px-3 py-1 rounded-2xl' onClick={()=>Navigate(`/Job-details/${id}`)}>Details</Button>
        <Button className='border-2 border-blue-600 px-3 py-1 rounded-2xl bg-white text-blue-600'>Save For Later</Button>
      </div>
    </div>
  )
}

export default JobCardJobPage
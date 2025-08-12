import React from 'react'
import { Badge } from '../ui/badge'
import { BadgeCheckIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NewJobCard = ({job}) => {
  const Navigate = useNavigate();
  const id = job._id;
  return (
    <div className='p-5 rounded-xl flex flex-col gap-2 shadow-xl border border-gray-300 cursor-pointer' onClick={()=>Navigate(`/Job-details/${id}`)}>
      <div className='flex flex-col'>
        <h1 className='text-black font-semibold text-2xl'>{job?.company?.name}</h1>
        <p className='text-gray-600 font-medium'>{job?.company?.location}</p>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-black font-semibold text-xl'>{job?.title}</h1>
        <p className='text-gray-600 font-medium'>{job?.description}
        </p>
      </div>
      <div className='flex flex-row gap-2 items-center'>
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheckIcon />
          {job?.company?.name}
        </Badge>
        <Badge variant="secondary">{job?.salary}</Badge>
        <Badge variant="destructive">{job?.position}</Badge>
        <Badge variant="outline">{job?.jobType}</Badge>
      </div>
    </div>
  )
}

export default NewJobCard
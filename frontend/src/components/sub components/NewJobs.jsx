import React from 'react'
import NewJobCard from './NewJobCard';
import { useSelector } from 'react-redux';
import NonLoginAccessJobCard from '../NonLoginAccessJobCard';

const randomJobs = [1,2,3,4,5,6,7,8];
const NewJobs = () => {
  const {allJobs} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  return (
    <div className='mt-[100px] flex flex-col gap-5 mx-auto px-4 max-w-7xl'>
        <h1 className='text-3xl font-semibold text-center'>Top Job Openings On <span className='text-blue-600 font-bold'>HireMe</span></h1>
        <div className='grid grid-cols-3 gap-5  mt-[18px] my-5 px-2'>
            {
            user ? allJobs.length <=0 ? <span>No Jobs</span> : allJobs?.slice(0,6).map((job)=> <NewJobCard key={job._id} job={job}/> ) : randomJobs.map((job)=><NonLoginAccessJobCard/>)
        }
        </div>
        
    </div>
  )
}

export default NewJobs
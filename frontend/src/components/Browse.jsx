import React from 'react'
import Navbar from './shared/Navbar'
import JobCardJobPage from './sub components/JobCardJobPage';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import NonLoginAccessJobCard from './NonLoginAccessJobCard';

const randomJobs = [1,2,,1,1,1,1,1,1,1];
const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store => store.job);
    const {user} = useSelector(store => store.auth);
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-[50px]'>
        <h1 className='text-2xl font-semibold'>Total Jobs Found ( { allJobs?.length } )</h1>
        <hr className='mt-4' />
        <div className='grid grid-cols-3 gap-4 mx-auto mt-5'>
          {
            user ? allJobs.length <= 0 ? <span>No job found</span> : allJobs?.map((job)=>{
              return ( <JobCardJobPage key={job._id} job={job}/> )
            }) : randomJobs.map((job)=> <NonLoginAccessJobCard/>)
          }
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Browse
import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterJobsCard from './sub components/FilterJobsCard'
import JobCardJobPage from './sub components/JobCardJobPage'
import { useSelector } from 'react-redux'
import NonLoginAccessJobCard from './NonLoginAccessJobCard'

const jobsArray = [1,2,3,4,5,6,7,8]
const Jobs = () => {
  const {allJobs} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  return (
    <div>
      <Navbar/>
      <div className='min-h-[100vh] max-w-7xl mx-auto mt-[70px]'>
        <div className='flex gap-3'>
            <div className='w-[20%]'>
              <FilterJobsCard/>  
            </div>
            

            {
               (
                    <div className='flex-1 h-full overflow-y-auto'>
                        <div className='grid grid-cols-3 gap-3'>
                            {
                                user ? allJobs.length <= 0 ? <span>No Jobs Here</span>  : allJobs.map((job)=>
                                <div>
                                    <JobCardJobPage key={job._id} job={job}/>
                                </div> ) : jobsArray.map((job)=> <NonLoginAccessJobCard/>)
                            }
                        </div>
                    </div>
                )
            }
        </div>
      </div>
      <Footer/>  
    </div>
  )
}

export default Jobs
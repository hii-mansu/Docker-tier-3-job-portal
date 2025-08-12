import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { BadgeCheckIcon } from 'lucide-react'
import { Button } from './ui/button'
import Navbar from './shared/Navbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLY_JOB_URL_POINT, JOB_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'

const JobDetails = () => {

  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  const isStartApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isStartApplied);

  
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async()=>{
    try {
      const res = await axios.get(`${APPLY_JOB_URL_POINT}/apply/${jobId}`, {withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message);
        setIsApplied(true);
        const updatedJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedJob));
      }
    } catch (error) {
      console.log(error);
        toast(error.eesponse.data.message);
    }
  }

  useEffect(()=>{
    const fatchoneJob = async ()=>{
        try {
            const res = await axios.get(`${JOB_END_URL_POINT}/get/${jobId}`, {withCredentials:true});
            console.log(res);
            if(res.data.success){
                dispatch(setSingleJob(res.data.job));
                setIsApplied(res.data.job.applications.some(application=> application.applicant === user?._id))
            }
        } catch (error) {
            console.log(error);
        }
    }
    fatchoneJob();
  },[jobId,dispatch, user?._id]);



  

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto mt-[70px] border-2 shadow-2xl rounded-2xl p-5'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-blue-600 font-bold text-2xl'>{singleJob?.title}</h1>
      <div className='flex flex-row gap-4'>
        <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600"
                >
                  <BadgeCheckIcon />
                  {singleJob?.company?.name}
                </Badge>
                <Badge variant="secondary">{singleJob?.salary}</Badge>
                <Badge variant="destructive">{singleJob?.position}</Badge>
                <Badge variant="outline">{singleJob?.jobType}</Badge>
      </div>
          </div>
          <Button 
          onClick={isApplied? null : applyJobHandler}
          className={`${isApplied ? "bg-gray-600 hover:bg-white hover:text-black border-2 border-gray-700" : "bg-blue-600 hover:bg-white hover:text-blue-600 border-2 border-blue-600"}`} >{isApplied ? "Already Applied" : "Apply Now"}</Button>
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-[40px]'>
        <h1 className='text-black font-bold'>Details {`${isStartApplied}`}</h1>
        <div>
          <h1 className='text-blue-600 font-semibold '>Role: <span className='text-gray-700'>{singleJob?.title}</span></h1>
          <h1 className='text-blue-600 font-semibold '>Location: <span className='text-gray-700'>{singleJob?.location}</span></h1>
          <h1 className='text-blue-600 font-semibold '>Description: <span className='text-gray-700'>{singleJob?.description}</span>
          </h1>
          <h1 className='text-blue-600 font-semibold '>Requirements: <span className='text-gray-700'>{singleJob?.requirements}</span></h1>
          <h1 className='text-blue-600 font-semibold '>Salary: <span className='text-gray-700'>{singleJob?.salary}</span></h1>
        <h1 className='text-blue-600 font-semibold '>Total Applicant: <span className='text-gray-700'>{singleJob?.applications?.length}</span></h1>
          <h1 className='text-blue-600 font-semibold '>Positions: <span className='text-gray-700'>{singleJob?.position}</span></h1>
          <h1 className='text-blue-600 font-semibold '>Post: <span className='text-gray-700'>{singleJob?.createdAt}</span></h1>
        </div>
      </div>





    </div>
    </div>
  )
}

export default JobDetails
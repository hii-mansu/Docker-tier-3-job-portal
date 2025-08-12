/*{import { setSingleJob } from '@/redux/jobSlice'
import { JOB_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSinglejob = (jobId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fatchoneJob = async ()=>{
        try {
            const res = await axios.get(`${JOB_END_URL_POINT}/get/${jobId}`, {withCredentials:true});
            if(res.data.success){
                dispatch(setSingleJob(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fatchoneJob();
  },[])
}

export default useGetSinglejob}*/
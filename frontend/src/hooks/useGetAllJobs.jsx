import { setAllJobs } from '@/redux/jobSlice'
import { JOB_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fatchAllJobs = async ()=>{
        try {
            const res = await axios.get(`${JOB_END_URL_POINT}/get`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fatchAllJobs();
  },[])
}

export default useGetAllJobs
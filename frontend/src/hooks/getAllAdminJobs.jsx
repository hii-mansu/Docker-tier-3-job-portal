import { setAllAdminJob } from '@/redux/jobSlice'
import { ADMIN_JOB_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const getAllAdminJobs = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fatchAllJobs = async ()=>{
        try {
            const res = await axios.get(`${ADMIN_JOB_END_URL_POINT}/getadminjobs`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllAdminJob(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fatchAllJobs();
  },[])
}

export default getAllAdminJobs
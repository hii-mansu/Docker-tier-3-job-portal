import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLY_JOB_URL_POINT } from "@/utills/imp.cnsnt.vrbl";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

const getAllAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fatchAllAppliedJobs = async()=>{
            try {
                const res = await axios.get(`${APPLY_JOB_URL_POINT}/get`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fatchAllAppliedJobs();
    })
}

export default getAllAppliedJobs
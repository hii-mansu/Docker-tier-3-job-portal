import { setCompanies } from '@/redux/companySlice'
import { COMPANY_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const getAllCompanies = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fatchAllCompanies = async ()=>{
        try {
            const res = await axios.get(`${COMPANY_END_URL_POINT}/get`, {withCredentials:true});
            if(res.data.success){
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fatchAllCompanies();
  },[])
}

export default getAllCompanies
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const getCompanyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fatchSingleCompany = async ()=>{
        try {
            const res = await axios.get(`${COMPANY_END_URL_POINT}/get/${companyId}`, {withCredentials:true});
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fatchSingleCompany();
  },[getCompanyById, dispatch])
}

export default getCompanyById
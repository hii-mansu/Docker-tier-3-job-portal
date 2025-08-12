import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import Footer from '../shared/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/authSlice'

const Login = () => {



const navigate = useNavigate();
const dispatch = useDispatch();
const [input, setInput]=useState({
    email:"",
    password:"",
    role:"",
  })

  const { loading } = useSelector(store => store.auth);
const changeEventHandler = (e)=>{
  setInput({...input, [e.target.name]:e.target.value});
}

const submitHandler = async (e)=>{
  e.preventDefault();
  try {
    dispatch(setLoading(true));
    const res = await axios.post(`${USER_END_URL_POINT}/login`, input, {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true,
    });
    if(res.data.success){
      dispatch(setUser(res.data.user));
      navigate("/");
       toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
     toast.error(error.response.data.message);
  }
  finally {
            dispatch(setLoading(false));
        }
}


  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center mx-auto max-w-7xl'>
        <form onSubmit={submitHandler} className='w-1/2 p-4 my-10 border-2 border-gray-500 rounded-xl'>
          <h1 className='text-[25px] font-bold text-blue-700'>Login</h1>
          <div className='mx-auto my-3 text-[16px] font-semibold'>
            <Label>Email</Label>
            <Input className='my-1'
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="xyz@xyzmail.com"
            />
          </div>
          <div className='mx-auto my-3 text-[16px] font-semibold'>
            <Label>Password</Label>
            <Input className='my-1'
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="xyz@xyz"
            />
          </div>
          <div className='flex items-center justify-between my-3 gap-2'>
            <RadioGroup defaultValue="comfortable" className='flex gap-4 text-[18px]'>
      <div className="flex items-center gap-3">
        <Input
        type="radio"
        name="role"
        value="student"
        checked={input.role == 'student'}
        onChange={changeEventHandler}
        className='cursor-pointer'
        />
        <label htmlFor="r1">Student</label>
      </div>
      <div className="flex items-center gap-3">
        <Input
        type="radio"
        name="role"
        value="recruiter"
        checked={input.role == 'recruiter'}
        onChange={changeEventHandler}
        className='cursor-pointer'
        />
        <label htmlFor="r2">Recruiter</label>
      </div>
    </RadioGroup>
          </div>

          <div className='flex flex-col gap-2'>
            {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className='w-full my-2 bg-blue-700 font-bold'>Submit</Button>
                    }
            <span >Don't have an account? <Link to='/Signup' className='text-blue-800'>Signup</Link></span>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import { toast } from 'sonner'
import Footer from '../shared/Footer'


  

const Signup = () => {

  const [input, setInput]=useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
  });
const navigate = useNavigate();
const changeEventHandler = (e)=>{
  setInput({ ...input, [e.target.name]:e.target.value});
}

const changeFileHandler = (e)=>{
  setInput({ ...input, file:e.target.files?.[0]});
}

const submitHandler = async (e)=>{
  e.preventDefault();
  const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
  
  try {
    const res = await axios.post(`${USER_END_URL_POINT}/register`, formData, {
      headers:{
        'Content-Type':"multipart/form-data"
      },
      withCredentials:true,
    });
    if(res.data.success){
      navigate("/login");
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}


  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center mx-auto max-w-7xl'>
        <form onSubmit={submitHandler} className='w-1/2 p-4 my-10 border-2 border-gray-500 rounded-xl'>
          <h1 className='text-[25px] font-bold text-blue-700'>Signup</h1>
          <div className='mx-auto my-3 text-[16px] font-semibold'>
            <Label>Full name</Label>
            <Input className='my-1'
            type="text"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Xyz Xyz"
            />
          </div>
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
            <Label>Phone</Label>
            <Input className='my-1'
            type="text"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler}
            placeholder="+xx 99x99xxxxx"
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
    <div className='flex gap-2 items-center'>
      <Label className='font-semibold'>Avtar</Label>
      <Input
      accept="image/*"
      type='file'
      onChange={changeFileHandler}
      className='cursor-pointer'
      />
    </div>
          </div>

          <div className='flex flex-col gap-2'>
            <Button type="submit" className='w-full my-2 bg-blue-700 font-bold'>Submit</Button>
            <span >Have an account? <Link to='/Login' className='text-blue-800'>Login</Link></span>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Signup
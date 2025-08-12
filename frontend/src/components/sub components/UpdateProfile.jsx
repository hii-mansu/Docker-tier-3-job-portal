import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'

const UpdateProfile = ({open, setOpen}) => {
  const [loading, setLoading]= useState(false);
  const {user} = useSelector(store=> store.auth);
  
  const [input, setInput]= useState({
    fullname: user?.fullname,
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill=> skill) || "",
    file: user?.profile?.resume || ""
  });


  const dispatch = useDispatch();


  const changeEventHandler = (e)=>{
  setInput({ ...input, [e.target.name]: e.target.value});
}
  const changeFileHandler = (e)=>{
    const file = e.target.files?.[0];
  setInput({ ...input, file})
}

const submitHandler = async (e)=>{
  e.preventDefault();
  const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("skills", input.skills);
        formData.append("bio", input.bio);
        formData.append("phoneNumber", input.phoneNumber);
        if (input.file) {
            formData.append("file", input.file);
        }
  
  try {
    setLoading(true);
    const res = await axios.post(`${USER_END_URL_POINT}/profile/updateProfile`, formData, {
      headers:{
        'Content-Type':"multipart/form-data"
      },
      withCredentials:true,
    });
    if(res.data.success){
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  } finally{
            setLoading(false);
        }
  setOpen(false);
  console.log(input)
}


  return (
    <div>
        <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between gap-3">
              <Label htmlFor="fullname">Name</Label>
              <Input id="fullname" name="fullname" value={input.fullname} 
            onChange={changeEventHandler} />
            </div>
            <div className="flex flex-row justify-between gap-3">
              <Label htmlFor="phoneNumber">Phone</Label>
              <Input type="Number" id="phoneNumber" name="phoneNumber" value={input.phoneNumber} 
             onChange={changeEventHandler} />
            </div>
            <div className="flex flex-row justify-between gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="Email" name="email" value={input.email} 
            onChange={changeEventHandler} readOnly />
            </div>
            <div className="flex flex-row justify-between gap-3">
              <Label htmlFor="bio">Description</Label>
              <Input id="bio" name="bio" value={input.bio} 
            onChange={changeEventHandler}/>
            </div>
            <div className="flex flex-row justify-between gap-3">
              <Label htmlFor="skills">Skills</Label>
              <Input name="skills" id="skills" value={input.skills} 
            onChange={changeEventHandler}/>
            </div>
            <div className="flex flex-row justify-between gap-3">
              <Label htmlFor="file">Resume</Label>
              <Input id="file" name="file" type='file' accept='application/pdf' 
            onChange={changeFileHandler} />
            </div>
          </div>

          <DialogFooter className='flex flex-col'>
            <DialogClose asChild>
              <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
            </DialogClose >
            
            {
                        loading ? <Button className='mr-2 h-4 w-full '> <Loader2 className='mr-2 h-4 w-full animate-spin' /> Please wait </Button> : <Button type="submit"  >Save</Button>
                    }
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
    </div>
  )
}

export default UpdateProfile
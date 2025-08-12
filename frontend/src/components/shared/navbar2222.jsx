import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_END_URL_POINT } from '@/utills/imp.cnsnt.vrbl'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_END_URL_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
  return (
    <div className='bg-white'>
        <div className='flex justify-between items-center mx-auto max-w-7xl h-16'>
            <div> 
                <h1 className='text-2xl font-bold'>Hire<span className='text-[blue]'>Me</span></h1>
            </div>
            <div className='flex items-center gap-10'>
                <ul className='flex font-medium text-center gap-5'>

                {
                    user && user.role === 'recruiter' ? (
                        <>
                        <li><Link to="/admin/Jobs">Jobs</Link></li>
                        <li><Link to="/admin/Companies">Companies</Link></li>
                        </>
                    ) : (
                        <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Jobs">Jobs</Link></li>
                        <li><Link to="/Browse">Browse</Link></li>
                        </>
                    )
                }
                </ul> 

                {
                    !user ? (
                        
                        <div className='flex gap-2 justify-around mx-auto'>
                            <Link to='/Login'><Button className='border-2 border-blue-700 text-blue-700 hover:bg-gray-200 cursor-pointer bg-white'>Login</Button></Link>
                            <Link to='/Signup'><Button className='border-2 border-blue-700 text-white hover:bg-blue-900 cursor-pointer bg-blue-700'>Signup</Button></Link>
                        </div>
                    ) : (
                                        <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className='w-80'>
                            <div className='flex gap-4 space-y-2'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                                <div>
                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                    <p className='text-sm text-secondary-foreground'>{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <div className=' flex flex-col my-2 text-gray-500'>
                                {
                                    
                                    user && user.role === 'recruiter' ? (
                                    <>
                                        <Button variant="link" onClick={logoutHandler} className="self-start"><LogOut/>   Logout</Button>
                                        </>
                                    ):
                                    (
                                        <>
                                          <Link to='/Profile' className='flex gap-1 items-center w-fit cursor-pointer'><User2/>
                                    <Button variant="link">Profile</Button></Link>
                                    <Button variant="link" onClick={logoutHandler} className="self-start"><LogOut/>   Logout</Button></>
                                    )
                                }
                                 
                            </div>
                        </PopoverContent>
                </Popover>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar
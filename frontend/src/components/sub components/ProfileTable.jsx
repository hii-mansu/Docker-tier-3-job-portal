import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const ProfileTable = () => {
  const {allAppliedJobs} = useSelector(store=>store.job);
  console.log(allAppliedJobs);
  return (
     <div className='text-center mt-[40px]'>
                  <h2 className='text-blue-600 font-bold'>All Applied Jobs</h2>
                  <hr className='my-2'/>
                  <Table>
                    <TableCaption>No more applications found</TableCaption>
                    <TableHeader className='font-semibold'>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        allAppliedJobs.length <=0 ? <span>No. Applied Jobs.</span> : allAppliedJobs.map((item)=>{
                          return(
                            <TableRow>
                              <TableCell>{item?.job?.createdAt}</TableCell>
                              <TableCell>{item?.job?.company?.name}</TableCell>
                              <TableCell>{item?.job?.title}</TableCell>
                              <TableCell><Badge className='bg-black py-1 px-2'>{item?.status}</Badge></TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </div>
  )
}

export default ProfileTable
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, MoreHorizontal, User } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const {allAdminJobs} = useSelector(store=>store.job)
    console.log(allAdminJobs);
  return (
    <div className="mt-7">
      <Table>
        <TableCaption>Added Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Co. Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Listing Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
         allAdminJobs.length <= 0 ? <span>No Companies.</span> : allAdminJobs?.map((companyData, index) => (
            
              <TableRow key="index">
                <TableCell>{companyData?.company?.name}</TableCell>
                <TableCell>{companyData?.title}</TableCell>
                <TableCell>{companyData?.createdAt}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <div className="cursor-pointer bg-blue-500 px-2 py-1 rounded text-white flex flex-row w-fit gap-2.5" onClick={()=>{navigate(`/admin/job/${companyData?._id}/applicants`)}}>
                            <User className="w-4"/><span>Applicants</span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
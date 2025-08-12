import React from 'react'
import Navbar from '../shared/Navbar';
import AdminJobsTable from './JobsSubComponents/AdminJobsTable';
import { Button } from '../ui/button';
import getAllAdminJobs from '@/hooks/getAllAdminJobs';
import { useNavigate } from 'react-router-dom';

const AdminJobsPage = () => {
    getAllAdminJobs();
    const navigate = useNavigate();
  return (
    <div className="w-full">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between mt-7">
          <Button
            className="bg-blue-700"
            onClick={() => {
              navigate("/admin/job/create");
            }}
          >
            Add Job
          </Button>
        </div>

        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobsPage
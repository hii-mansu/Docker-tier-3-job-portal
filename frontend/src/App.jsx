import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import path from 'path'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDetails from './components/JobDetails'
import Companies from './components/admin/Companies'
import AddCompany from './components/admin/AddCompany'
import UpdateCompany from './components/admin/UpdateCompany'
import AdminJobsPage from './components/admin/AdminJobsPage'
import AddJobs from './components/admin/AddJobs'
import JobApplicants from './components/admin/JobApplicants'

const appRouter = createBrowserRouter(
  [
    {
      path:'/',
    element:<Home/>
    },
    {
      path:'/Login',
    element:<Login/>
    },
    {
      path:'/Signup',
    element:<Signup/>
    },
    {
      path:'/Jobs',
    element:<Jobs/>
    },
    {
      path:'/Job-details/:id',
    element:<JobDetails/>
    },
    {
      path:'/Browse',
    element:<Browse/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/admin/companies',
      element:<Companies/>
    },
    {
      path:'/admin/companies/create',
      element:<AddCompany/>
    },
    {
      path:'/admin/companies/:id',
      element:<UpdateCompany/>
    },
    {
      path:'/admin/jobs',
      element:<AdminJobsPage/>
    },
    {
      path:'/admin/job/create',
      element:<AddJobs/>
    },
    {
      path:'/admin/job/:id/applicants',
      element:<JobApplicants/>
    }
  ]
)

function App() {

  return (
    <>
    <RouterProvider router ={appRouter}/>
    </>
  )
}

export default App

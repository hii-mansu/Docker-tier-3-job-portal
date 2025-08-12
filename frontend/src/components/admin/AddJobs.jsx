import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { ADMIN_JOB_END_URL_POINT } from "@/utills/imp.cnsnt.vrbl";
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useSelector } from "react-redux";

const AddJobs = () => {

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: 0,
    companyId:"",
  });


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {companies} = useSelector(store=>store.company);
  console.log(companies);



  const changeEventHandler = (e) => {
    console.log(input);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectorChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${ADMIN_JOB_END_URL_POINT}/post`,
        input,
        {
          headers: {
            'Content-Type':'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <form className="mx-auto w-fit" onSubmit={submitHandler}>
          <div className="flex flex-row gap-5 mt-7 items-center mx-auto">
            <ArrowLeft
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/admin/jobs");
              }}
            />
            <span className="text-blue-600 text-xl font-semibold">
              Add New Job.
            </span>
          </div>
          <div className="grid grid-cols-2 mt-[50px] gap-[30px]">
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">Title</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="title"
                type="text"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">Description</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="description"
                type="text"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">Requirements</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="requirements"
                type="text"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">Salary</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="salary"
                type="text"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">Location</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="location"
                type="text"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">Job Type</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="jobType"
                type="text"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">No. Of Openings</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="position"
                type="number"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <Select onValueChange={selectorChangeHandler}>
              <Label className="text-gray-700">Select A Company</Label>
                <SelectTrigger className="w-[300px] border-gray-700 border-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                        companies.length <=0 ? <span>No Companies Listed.</span> : companies.map((company)=>{
                            return( 
                            <SelectItem value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                        )
                        })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <Button type='submit' className="w-[300px] mx-auto mt-7">Submit</Button>*/}
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2 bg-blue-700 font-bold">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddJobs;

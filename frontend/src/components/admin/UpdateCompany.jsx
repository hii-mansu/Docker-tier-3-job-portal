import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { COMPANY_END_URL_POINT } from "@/utills/imp.cnsnt.vrbl";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import getCompanyById from "@/hooks/getCompanyById";

const UpdateCompany = () => {
  const params = useParams();
  getCompanyById(params.id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });


  const { singleCompany } = useSelector(store => store.company);
  console.log(singleCompany)
  const changeEventHandler = (e) => {
    console.log(singleCompany);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeEFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  

  


  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_END_URL_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.website || "",
      file: singleCompany.file || null
    });
  },[singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <form onSubmit={submitHandler} className="mx-auto w-fit">
          <div className="flex flex-row gap-5 mt-7 items-center mx-auto">
            <ArrowLeft
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/admin/companies");
              }}
            />
            <span className="text-blue-600 text-xl font-semibold">
              Update/Setup Company Info.
            </span>
          </div>
          <div className="grid grid-cols-2 mt-[50px] gap-[30px]">
            <div className="flex flex-col gap-3 mx-auto">
              <Label className="text-gray-700">Company Name</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="name"
                type="text"
                value={input.name}
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
              <Label className="text-gray-700">Website</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                name="website"
                type="text"
                value={input.website}
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
              <Label className="text-gray-700">Logo</Label>
              <Input
                className="w-[300px] border-gray-700 border-2"
                type="file"
                accept="image/*"
                onChange={changeEFileHandler}
              />
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

export default UpdateCompany;

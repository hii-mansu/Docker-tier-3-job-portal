import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_END_URL_POINT } from "@/utills/imp.cnsnt.vrbl";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const AddCompany = () => {
  const navigate = useNavigate();
  const disptch = useDispatch();
  const [companyName, setCompanyName] = useState();
  console.log(companyName)
  const addCompanyHandler = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_END_URL_POINT}/register`,
        { companyName },
        {
          Headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        disptch(setSingleCompany(res.data.company));
        toast(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <Input
          placeholder="Company Name"
          className="w-[50%] max-w-[500px] border-1 border-blue-700 mt-6"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex mt-4 gap-3">
          <Button
            onClick={() => {
              navigate("/admin/companies");
            }}
          >
            Cancle
          </Button>
          <Button className="bg-blue-700" onClick={addCompanyHandler}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;

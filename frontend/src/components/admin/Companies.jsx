import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./HomeSubComponents/CompaniesTable";
import getAllCompanies from "@/hooks/getAllCompanies";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  getAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputSearchCompany, setInputSearchCompany] = useState("");
  console.log(inputSearchCompany)

  useEffect(()=>{
    dispatch(setSearchCompanyByText(inputSearchCompany));
  },[inputSearchCompany])
  return (
    <div className="w-full">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between mt-7">
          <Input
            placeholder="Search company."
            className="w-[50%] max-w-[500px] border-1 border-blue-700"
            onChange={(e)=>setInputSearchCompany(e.target.value)}
          />
          <Button
            className="bg-blue-700"
            onClick={() => {
              navigate("/admin/companies/create");
            }}
          >
            Add Company
          </Button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;

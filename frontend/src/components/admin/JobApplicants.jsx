import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./JobsSubComponents/ApplicantsTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLY_JOB_URL_POINT } from "@/utills/imp.cnsnt.vrbl";
import { setAllApplicants } from "@/redux/applicantsSlice";

const JobApplicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector((store) => store.application);
  console.log(allApplicants)
  useEffect(() => {
    const getApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLY_JOB_URL_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApplicants();
  }, []);

  return (
    <div className="w-full">
      <Navbar />

      <span className="text-2xl font-semibold text-blue-700">
        Applicants Found ({allApplicants?.applications?.length})
      </span>
      <ApplicantsTable/>
    </div>
  );
};

export default JobApplicants;

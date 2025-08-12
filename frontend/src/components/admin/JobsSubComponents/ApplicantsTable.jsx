import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { APPLY_JOB_URL_POINT } from "@/utills/imp.cnsnt.vrbl";
import axios from "axios";
import { toast } from "sonner";

const ApplicationStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { allApplicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLY_JOB_URL_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-7 mx-auto flex flex-col">
      <Table className="mt-7">
        <TableCaption>
          All Applications.{allApplicants?.applications?.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Apply Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allApplicants.applications.length <= 0 ? (
            <span>No. Applicants</span>
          ) : (
            allApplicants?.applications?.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{data?.applicant?.fullname}</TableCell>
                  <TableCell>{data?.applicant?.email}</TableCell>
                  <TableCell>{data?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {" "}
                    <a
                      href={data?.applicant?.profile?.resume}
                      className="text-blue-700"
                    >
                      View
                    </a>
                  </TableCell>
                  <TableCell>{data?.applicant?.createdAt}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="bg-blue-700 p-4 rounded-2xl">
                        {ApplicationStatus.map((status, index) => {
                          return (
                            <div
                              onClick={() => statusHandler(status, data?._id)}
                              key={index}
                              className="flex w-fit items-center my-2 cursor-pointer text-white bg-blue-400 px-4 py-2 rounded-2xl"
                            >
                              <span>{status}</span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

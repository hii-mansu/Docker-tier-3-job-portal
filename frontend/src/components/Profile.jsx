import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail, Pen, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import ProfileTable from "./sub components/ProfileTable";
import UpdateProfile from "./sub components/UpdateProfile";
import { useSelector } from "react-redux";
import getAllAppliedJobs from "@/hooks/getAllAppliedJobs";

const isResume = true;
const Profile = () => {
  getAllAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-[70px] border-2 items-center p-5 rounded-2xl shadow-2xl">
        <div className="flex flex-row justify-between mt-[40px]">
          <div className="flex flex-row gap-5 items-center">
            <Avatar>
              <AvatarImage src="https://i.ibb.co/6NZZPj7/visual-studio.png" />
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{user?.fullname}</h2>
              <p className="text-gray-600 font-medium">{user?.profile?.bio}</p>
            </div>
          </div>
          <div>
            <Button onClick={() => setOpen(true)}>
              <Pen />
            </Button>
          </div>
        </div>

        <div className="flex flex-col mt-[40px] gap-4">
          <span className="flex flex-row gap-4 items-center">
            <Mail className="text-blue-600" />
            <p className="text-black font-semibold">{user?.email}</p>
          </span>
          <span className="flex flex-row gap-4 items-center">
            <Phone className="text-blue-600" />
            <p className="text-black font-semibold">{user?.phoneNumber}</p>
          </span>
        </div>

        <div className="mt-[40px] flex flex-col gap-2">
          <h2 className="font-bold">Skills ({user?.profile?.skills.length})</h2>
          <div className="flex flex-row gap-2">
            {user?.profile?.skills.map((item, index) => {
              return (
                <Badge
                  key="index"
                  variant="outline"
                  className="font-semibold border-blue-700 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  {item}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="mt-[40px] flex flex-row gap-5 items-center">
          <div className="text-black font-bold">Resume</div>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="border-2 rounded-full px-2 py-1 text-[14px] hover:bg-blue-600 hover:text-white"
            >
              View Resume
            </a>
          ) : (
            <span className="border-2 rounded-full px-2 py-1 text-[14px] hover:bg-blue-600 hover:text-white">
              Uplode Resume
            </span>
          )}
        </div>

        <ProfileTable />
        <div>
          <UpdateProfile open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

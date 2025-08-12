import { Avatar } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const {companies , searchCompanyByText} = useSelector(store=>store.company);
  console.log(companies)
  const [filterCompanies, setFilterCompanies] = useState(companies);
  useEffect(()=>{
    const filteredCompanies = companies.length >= 0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompanies(filteredCompanies)
  },[companies , searchCompanyByText])
  return (
    <div className="mt-7">
      <Table>
        <TableCaption>Added Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Co. Logo</TableHead>
            <TableHead>Co. Name</TableHead>
            <TableHead>Listing Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          filterCompanies.length <= 0 ? <span>No Companies.</span> : filterCompanies?.map((company, index) => (
            
              <TableRow key="index">
                <TableCell>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <div className="cursor-pointer bg-blue-500 px-2 py-1 rounded text-white flex flex-row w-fit gap-2.5" onClick={()=>navigate(`/admin/companies/${company._id}`)}>
                            <Edit2 className="w-4"/><span>Edit</span>
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
  );
};

export default CompaniesTable;

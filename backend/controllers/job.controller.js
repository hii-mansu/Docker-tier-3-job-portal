import { Job } from "../models/job.model.js";

export const postJob = async (req,res)=>{
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId } = req.body;
 const userId = req.id;

 if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId){
    return res.status(400).json({
        message:"Something is messing",
        success:false
    })
 };

 const job = await Job.create({
    title, 
    description, 
    requirements: requirements.split(","), 
    salary: Number(salary), 
    location, 
    jobType, 
    position, 
    company:companyId,
    created_by: userId,
 });
 return res.status(201).json({
    message:"Job ceated successfully",
    job,
    success:true
 });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query ={
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        });
        if(!jobs){
            return res.status(404).json({
                message:"Not job found",
                success:false,
            })
        };
        return res.status(200).json({
            message:"Jobs found",
            jobs,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
};

export const getJobById = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ // populate help to show details of another model
            path:"applications"
        });
        if(!job){
            returnres.status(404).json({
                message:"Job not found",
                success:false,
            })
        };
        return res.status(200).json({
            message:"Job found",
            job,
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
}


export const getAdminJobs = async (req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company"
        });
        
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false,
            })
        };

        return res.status(200).json({
            message:"Jobs found",
            jobs,
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
};
import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

export const applyJob = async(req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;

        //if applieing without job id
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false,
            })
        };

        //check that user already applied or not
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"Already Applied",
                success:false,
            })
        };


        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job Not Found",
                success:false,
            })
        };

        //Now create application

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true,
        });

    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async(req,res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            option:{sort:{createdAt:-1}},
            populate:{path:'company', option:{createdAt:-1}}
        });
        if(!application){
            return res.status(404).json({
                message:"No applications Found",
                success:false
            })
        };
        return res.status(202).json({
            message:"Application found",
            application,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
};
//admin want to check , how much user applied
export const getapplicants = async (req,res)=>{
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path:'applications',
            option:{sort:{createdAt:-1}},
        populate:{path:'applicant'
        }
        });
        if(!job){
            return res.status(404).json({
                message:"No applicant",
                success:false
            })
        };

        return res.status(200).json({
            job,
            success:true,
            });
    } catch (error) {
        console.log(error);
    }
};

export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationid = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status required",
                success:false
            })
        };


        const application = await Application.findOne({_id:applicationid});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false,
            })
        };

        application.status = status.toLowerCase();
        await application.save();
        
            return res.status(200).json({
                message:"Status updated",
                success:true
            });
    } catch (error) {
        console.log(error);
    }
}
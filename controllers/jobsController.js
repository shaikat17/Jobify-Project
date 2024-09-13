import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkParmissions.js";
import mongoose from "mongoose";

// job create controller
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please Provide all values.");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

// job delete controller
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId })
  
  if (!job) {
    throw new NotFoundError('No job found with thi information')
  }

  checkPermissions(req.user, job.createdBy)

  await job.deleteOne()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job Removed...'})
};

// job update controller
const updateJob = async (req, res) => {
  const { id: jobId } = req.params

  const { company, position } = req.body

  if (!company || !position) {
    throw new BadRequestError('Please provide all values.')
  }

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError('No job found with this information.')
  }

  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, { new: true, runValidators: true })
  
  res.status(StatusCodes.OK).json({ updateJob })
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
  console.log("🚀 ~ getAllJobs ~ jobs:", jobs)
  
  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1})
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 }} }
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count

    return acc
  }, {})
  
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined
  }

  let monthlyApplications = []

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };

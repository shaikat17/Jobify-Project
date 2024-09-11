import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import { BadRequestError } from "../errors/index.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please Provide all values.");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = (req, res) => {
  res.send("delete job");
};

const updateJob = (req, res) => {
  res.send("update job");
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
  
  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1})
};

const showStats = (req, res) => {
  res.send("show job stats");
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };

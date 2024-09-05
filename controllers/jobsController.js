const createJob = (req, res) => {
    res.send('create Job')
}

const deleteJob = (req, res) => {
    res.send('delete job')
}

const updateJob = (req, res) => {
    res.send('update job')
}

const getAllJobs = (req, res) => {
    res.send('get all jobs')
}

const showStats = (req, res) => {
    res.send('show job stats')
}

export { createJob, deleteJob, updateJob, getAllJobs, showStats }
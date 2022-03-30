const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userID }).sort('createdAt')

    res.status(StatusCodes.OK).json({
        jobs, count: jobs.length
    })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID

    const createJob = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json(createJob)
}

const getSingleJob = async (req, res) => {
    const { user: { userID }, params: { id: jobID } } = req

    const job = await Job.findOne({
        _id: jobID,
        createdBy: userID
    })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobID}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
    const {
        user: { userID },
        params: { id: jobID },
        body: { company, position }
    } = req

    if (!company || !position) {
        throw new BadRequestError('Please provide full information')
    }

    const job = await Job.findByIdAndUpdate(
        { _id: jobID, createdBy: userID }, req.body, { new: true, runValidators: true }
    )

    if (!job) {
        throw new NotFoundError('404 Not Found')
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const { user: { userID }, params: { id: jobID } } = req

    const job = await Job.findByIdAndRemove(
        { _id: jobID, createdBy: userID }
    )

    if (!job) {
        throw new NotFoundError('404 Not Found')
    }
    res.status(StatusCodes.OK).send()
}

module.exports = { getAllJobs, createJob, getSingleJob, updateJob, deleteJob }
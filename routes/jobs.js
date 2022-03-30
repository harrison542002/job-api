const express = require('express')
const routes = express.Router()
const { getAllJobs, getSingleJob, createJob, updateJob, deleteJob} = require('../controllers/jobs')

routes.route('/').get(getAllJobs).post(createJob)
routes.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = routes
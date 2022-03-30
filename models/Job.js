const mongoose = require('mongoose')

const Job = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 10
    },
    status: {
        type: String,
        enum: ['pending', 'decline', 'interview'],
        default: 'pending'
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provid user']
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', Job)
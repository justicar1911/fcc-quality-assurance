const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    assigned_to: {
        type: String,
        default: ""
    },
    status_text: {
        type: String,
        default: ""
    },
    open: {
        type: Boolean,
        default: true
    },
})

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        index: true,
        unique: true,
        lowercase: true
    },
    issues: [issueSchema]
})

module.exports = mongoose.model('Project', projectSchema)
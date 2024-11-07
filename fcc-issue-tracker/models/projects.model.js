const projectDB = require('./projects.mongo')
const mongoose = require('mongoose')

async function getAllIssues(projectName, queries) {
    let project = await projectDB.findOneAndUpdate(
        {
            projectName,
        },
        {
            $setOnInsert: { projectName }
        },
        { upsert: true, new: true }
    )
    let issues = project.issues

    if (Object.entries(queries).length === 0) {
        return issues
    }

    let {
        _id,
        issue_title,
        issue_text,
        created_by,
        open,
        assigned_to,
        status_text,
    } = queries

    return issues.filter(issue => {
        return (_id === undefined || issue._id == _id)
            && (issue_title === undefined || issue.issue_title == issue_title)
            && (issue_text === undefined || issue.issue_text == issue_text)
            && (created_by === undefined || issue.created_by == created_by)
            && (open === undefined || String(issue.open) == open)
            && (assigned_to === undefined || issue.assigned_to == assigned_to)
            && (status_text === undefined || issue.status_text == status_text)
    })
}

async function addNewIssue(projectName, data) {
    const project = await projectDB.findOneAndUpdate(
        { projectName },
        {
            $setOnInsert: { projectName },
            $push: { issues: data }
        },
        { upsert: true, new: true })

    return project.issues[project.issues.length - 1]
}

async function updateIssue(projectName, _id, data) {
    try {
        if (Object.keys(data).length == 1) {
            return { error: 'no update field(s) sent', _id }
        }

        const updatedData = Object.fromEntries(
            Object.entries(data)
                .filter(([key]) => key !== '_id')
                .map(([key, value]) => [`issues.$.${key}`, value])
        );

        let project = await projectDB.findOneAndUpdate(
            {
                projectName,
                "issues._id": _id
            },
            { $set: { ...updatedData, "issues.$.updated_on": new Date() } },
            { new: true })

        if (!project) {
            return { error: 'could not update', _id }
        }

        return { result: "successfully updated", _id }
    } catch {
        return { error: 'could not update', _id }
    }
}

async function deleteIssue(projectName, _id) {
    try {
        let project = await projectDB.findOne({ projectName, "issues._id": _id })
        if (!project) {
            return { error: 'could not delete', _id }
        }

        await projectDB.findOneAndUpdate(
            { projectName },
            { $pull: { issues: { _id } } }
        )
        return { result: "successfully deleted", _id }
    } catch {
        return { error: 'could not delete', _id }
    }
}

module.exports = {
    getAllIssues,
    addNewIssue,
    updateIssue,
    deleteIssue
}
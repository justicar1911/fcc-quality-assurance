'use strict';
const {
  getAllIssues,
  addNewIssue,
  updateIssue,
  deleteIssue } = require('../models/projects.model')

module.exports = function (app) {

  app.route('/api/issues/:project')
    .get(async function (req, res) {
      let projectName = req.params.project;
      let project = await getAllIssues(projectName, req.query)

      return res.status(200).json(project)
    })

    .post(async function (req, res) {
      let projectName = req.params.project;
      let {
        issue_title,
        issue_text,
        created_by
      } = req.body

      if (!issue_title || !issue_text || !created_by) {
        return res.status(200).json({
          error: 'required field(s) missing'
        })
      }

      let issue = await addNewIssue(projectName, req.body)

      return res.status(200).json(issue)
    })

    .put(async function (req, res) {
      let projectName = req.params.project;
      let { _id } = req.body
      if (!_id) {
        return res.status(200).json({ error: 'missing _id' })
      }

      let data = Object.fromEntries(Object.entries(req.body).filter(([_, value]) => value !== ''))
      let result = await updateIssue(projectName, _id, data)
      return res.status(200).json(result)
    })

    .delete(async function (req, res) {
      let projectName = req.params.project;
      let { _id } = req.body
      if (!_id) {
        return res.status(200).json({ error: 'missing _id' })
      }

      let result = await deleteIssue(projectName, _id)
      return res.status(200).json(result)
    });

};

'use strict';

const mongoose = require('mongoose');

module.exports = function (app) {
  const IssueSchema = new mongoose.Schema({
    project: { type: String, required: true },
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String, default: '' },
    status_text: { type: String, default: '' },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
    open: { type: Boolean, default: true },
  });

  const Issue = mongoose.model('Issue', IssueSchema);

  app
    .route('/api/issues/:project')
    .get(async function (req, res) {
      const { project } = req.params;
      const query = req.query;

      delete query.project;

      try {
        const issues = await Issue.find({ project, ...query });

        res.json(issues);
      } catch (err) {
        res.status(500).json({ error: 'could not get issues' });
      }
    })

    .post(async function (req, res) {
      const { project } = req.params;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      // Check required fields
      if ([issue_title, issue_text, created_by].some((v) => !v)) {
        return res.json({ error: 'required field(s) missing' });
      }

      try {
        const newIssue = new Issue({
          project,
          issue_title,
          issue_text,
          created_by,
          assigned_to: assigned_to || '',
          status_text: status_text || '',
        });

        const savedIssue = await newIssue.save();

        res.json(savedIssue);
      } catch (err) {
        res.status(500).json({ error: 'could not create issue' });
      }
    })

    .put(async function (req, res) {
      const project = req.params.project;
      const { _id, ...updateFields } = req.body;

      // Check if _id is provided
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      // Check if there are any fields to update
      if (Object.keys(updateFields).length === 0) {
        return res.json({ error: 'no update field(s) sent', _id: _id });
      }

      try {
        // Add updated_on date to update fields
        updateFields.updated_on = new Date();

        const result = await Issue.findOneAndUpdate({ _id, project }, updateFields, { new: true });

        if (!result) {
          return res.json({ error: 'could not update', _id: _id });
        }

        res.json({ result: 'successfully updated', _id: _id });
      } catch (err) {
        res.json({ error: 'could not update', _id: _id });
      }
    })

    .delete(async function (req, res) {
      const project = req.params.project;
      const { _id } = req.body;

      // Check if _id is provided
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        const result = await Issue.findOneAndDelete({ _id, project });

        if (!result) {
          return res.json({ error: 'could not delete', _id: _id });
        }

        res.json({ result: 'successfully deleted', _id: _id });
      } catch (err) {
        res.json({ error: 'could not delete', _id: _id });
      }
    });
};
